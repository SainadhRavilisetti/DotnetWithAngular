using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DattingApp.Migrations
{
    /// <inheritdoc />
    public partial class userentityupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Password",
                table: "profiles",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "Passwordsalt",
                table: "profiles",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "profiles");

            migrationBuilder.DropColumn(
                name: "Passwordsalt",
                table: "profiles");
        }
    }
}
