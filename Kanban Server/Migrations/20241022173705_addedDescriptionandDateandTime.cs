using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kanban_Server.Migrations
{
    /// <inheritdoc />
    public partial class addedDescriptionandDateandTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LinkName",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LinkUrl",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Boards",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LinkName",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "LinkUrl",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Boards");
        }
    }
}
