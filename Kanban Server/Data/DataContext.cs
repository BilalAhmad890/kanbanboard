using Microsoft.EntityFrameworkCore;
using Kanban_Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace Kanban_Server.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DbSet<Board> Boards { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(u => u.UserName).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}