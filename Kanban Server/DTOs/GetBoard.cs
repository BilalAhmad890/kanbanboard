namespace Kanban_Server.DTOs
{
    public class GetBoardWithTasksDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? Created { get; set; }
        public List<GetTaskDto> Tasks { get; set; } = new List<GetTaskDto>();
    }
}