using Kanban_Server.Data;
using Kanban_Server.DTOs;
using Kanban_Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;





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

                return result.Succeeded
           ? Results.Ok(new { message = "User registered" })
           : Results.BadRequest(new { message = "Registration failed", errors = result.Errors });
            });

            group.MapPost("/login", async (LoginDto dto, SignInManager<User> signInManager) =>
            {
                var user = await signInManager.UserManager.FindByEmailAsync(dto.Email);
                if (user == null) return Results.BadRequest("Invalid login");

                var result = await signInManager.PasswordSignInAsync(user, dto.Password, isPersistent: true, lockoutOnFailure: false);
                return result.Succeeded ? Results.Ok("Login successful") : Results.BadRequest("Invalid login");
            });


            group.MapPost("/logout", async (SignInManager<User> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok(new { message = "Logged out successfully" });
            });

            group.MapGet("/check-auth", (HttpContext httpContext, UserManager<User> userManager) =>
            {
                var user = httpContext.User; 
                if (user.Identity?.IsAuthenticated == true)
                {
                    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
                    var userDetails = userManager.FindByIdAsync(userId).Result;

                    return Results.Ok(new { isAuthenticated = true, user = userDetails });
                }
                return Results.Ok(new { isAuthenticated = false });
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
                    Created = DateTime.Now,
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
                                Created = b.Created,
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


            group.MapPut("/update-profile", [Authorize] async (ProfileDto dto, UserManager<User> userManager, HttpContext httpContext) =>
            {
                var user = await userManager.GetUserAsync(httpContext.User);
                if (user == null) return Results.Unauthorized();
                if (user.UserName == dto.UserName) return Results.BadRequest(new{message = "Same Username as Before"});

                user.UserName = dto.UserName;

                var result = await userManager.UpdateAsync(user);
                return result.Succeeded
                    ? Results.Ok(new { message = "User profile updated successfully" })
                    : Results.BadRequest(new { message = "Failed to update profile", errors = result.Errors });
            });


            group.MapDelete("/delete-user", [Authorize] async (UserManager<User> userManager, SignInManager<User> signInManager, HttpContext httpContext) =>
            {
                var user = await userManager.GetUserAsync(httpContext.User);
                if (user == null) return Results.Unauthorized();

                var result = await userManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    return Results.BadRequest(new { message = "Failed to delete user", errors = result.Errors });
                }

                // Sign the user out and remove session cookies
                await signInManager.SignOutAsync();

                // Explicitly clear any session cookie related to user authentication
                httpContext.Response.Cookies.Delete(".AspNetCore.Cookies");

                return Results.Ok(new { message = "User deleted and logged out successfully" });
            });


            return group;
        }
    }
}