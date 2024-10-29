
namespace Kanban_Server.Models 
{
public class Board
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<Task> Tasks { get; set; } = new();
    public string UserId { get; set; } = string.Empty;
    public User User { get; set; } = null!;
    public DateTime? Created { get; set;}

    }

}