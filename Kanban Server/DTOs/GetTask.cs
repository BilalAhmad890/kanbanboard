namespace Kanban_Server.DTOs
{
    public class GetTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string LinkUrl { get; set; } = string.Empty;
        public string LinkName { get; set; } = string.Empty;
        public DateTime DateAndTime { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}