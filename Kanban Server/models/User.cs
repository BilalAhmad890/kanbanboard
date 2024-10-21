using Microsoft.AspNetCore.Identity;

namespace Kanban_Server.Models
{
    public class User : IdentityUser
    {
        public List<Board> Boards { get; set; } = new();
    }
}