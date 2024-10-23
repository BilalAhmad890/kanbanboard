using Kanban_Server.Data;
using Kanban_Server.DTOs;
using Kanban_Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;




namespace Kanban_Server.Api
{
    public static class ApiEndpoints
    {
        public static RouteGroupBuilder MapApiEndpoints(this RouteGroupBuilder group)
        {
            group.MapPost("/register", async (RegisterDto dto, UserManager<User> userManager) =>
            {
                if (await userManager.FindByEmailAsync(dto.Email) != null)
                    return Results.BadRequest("Email already registered");

                var user = new User { UserName = dto.Username, Email = dto.Email };
                var result = await userManager.CreateAsync(user, dto.Password);

                return result.Succeeded ? Results.Ok("User registered") : Results.BadRequest(result.Errors);
            });

            group.MapPost("/login", async (LoginDto dto, SignInManager<User> signInManager) =>
            {
                var user = await signInManager.UserManager.FindByEmailAsync(dto.Email);
                if (user == null) return Results.BadRequest("Invalid login");

                var result = await signInManager.PasswordSignInAsync(user, dto.Password, isPersistent: true, lockoutOnFailure: false);
                return result.Succeeded ? Results.Ok("Login successful") : Results.BadRequest("Invalid login");
            });

            group.MapPost("/boards", [Authorize] async (BoardDto dto, DataContext context, UserManager<User> userManager, HttpContext httpContext) =>
            {
                var errors = ValidationHelper.Validate(dto);
                if (errors.Count > 0)
                {
                    return Results.BadRequest(new { Errors = errors });
                }

                var user = await userManager.GetUserAsync(httpContext.User);
                if (user == null) return Results.Unauthorized();

                var board = new Board
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    UserId = user.Id,
                };
                context.Boards.Add(board);
                await context.SaveChangesAsync();
                return Results.Ok("Board created");
            });

            group.MapPost("/boards/{boardId}/tasks", [Authorize] async (int boardId, TaskDto dto, DataContext context, UserManager<User> userManager, HttpContext httpContext) =>
            {
                var errors = ValidationHelper.Validate(dto);
                if (errors.Count > 0)
                {
                    return Results.BadRequest(new { Errors = errors });
                }

                var user = await userManager.GetUserAsync(httpContext.User);
                if (user == null) return Results.Unauthorized();

                var board = await context.Boards.FindAsync(boardId);
                if (board == null) return Results.NotFound("Board not found");

                var task = new Models.Task
                {
                    Title = dto.Title,
                    Description = dto.Description,  
                    LinkUrl = dto.LinkUrl,         
                    LinkName = dto.LinkName,
                    DateAndTime = DateTime.Now,
                    Status = Enum.Parse<Models.TaskStatus>(dto.Status), 
                    BoardId = boardId
                };

                context.Tasks.Add(task);
                await context.SaveChangesAsync();
                return Results.Ok("Task added to board");
            });


            group.MapPut("/tasks/{taskId}/status", [Authorize] async (int taskId, Models.TaskStatus newStatus, DataContext context) =>
            {
                var task = await context.Tasks.FindAsync(taskId);
                if (task == null) return Results.NotFound("Task not found");

                task.Status = newStatus;
                await context.SaveChangesAsync();
                return Results.Ok("Task status updated");
            });


            group.MapGet("/boards", [Authorize] async (DataContext context, UserManager<User> userManager, HttpContext httpContext) =>
            {
                var loggedInUser = await userManager.GetUserAsync(httpContext.User);
                if (loggedInUser == null)
                    return Results.Unauthorized();

                var boardsWithTasks = await context.Boards
                    .Where(b => b.UserId == loggedInUser.Id)
                            .Select(b => new GetBoardWithTasksDto
                            {
                                Id = b.Id,
                                Title = b.Title,
                                Description = b.Description,
                                Tasks = b.Tasks.Select(t => new GetTaskDto
                                {
                                    Id = t.Id,
                                    Title = t.Title,
                                    Description = t.Description,
                                    LinkUrl = t.LinkUrl,
                                    LinkName = t.LinkName,
                                    DateAndTime = t.DateAndTime,
                                    Status = t.Status.ToString()
                                }).ToList()
                            })
                            .ToListAsync();

                return Results.Ok(boardsWithTasks);
            });



            return group;
        }
    }
}