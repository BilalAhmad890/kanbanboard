using System.ComponentModel.DataAnnotations;
namespace Kanban_Server.DTOs
{
   public class TaskDto
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 100 characters")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; } = string.Empty;

        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 1000 characters")]
        public string Description { get; set; } = string.Empty;

        [Url(ErrorMessage = "Invalid URL format")]
        public string LinkUrl { get; set; } = string.Empty;

        [StringLength(100, MinimumLength = 1, ErrorMessage = "Link name must be between 1 and 100 characters")]
        public string LinkName { get; set; } = string.Empty;
    }
}

