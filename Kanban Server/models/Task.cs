using Microsoft.VisualBasic;

namespace Kanban_Server.Models
{
    public class Task
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string BulletPoints { get; set; } = string.Empty;
    public DateTime DateAndTime { get; set; } = DateTime.Now;
    public TaskStatus Status { get; set; } = TaskStatus.Backlog;  // Default status is "Backlog"
    public int BoardId { get; set; }
    public Board Board { get; set; } = null!;
}

}