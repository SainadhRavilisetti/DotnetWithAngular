using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DattingApp.Migrations
{
    /// <inheritdoc />
    public partial class seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "profiles",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "profiles",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "profie_Members",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MemberId",
                table: "photos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProfileId",
                table: "photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_photos_ProfileId",
                table: "photos",
                column: "ProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_photos_profiles_ProfileId",
                table: "photos",
                column: "ProfileId",
                principalTable: "profiles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photos_profiles_ProfileId",
                table: "photos");

            migrationBuilder.DropIndex(
                name: "IX_photos_ProfileId",
                table: "photos");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "profie_Members");

            migrationBuilder.DropColumn(
                name: "MemberId",
                table: "photos");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "photos");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "profiles",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "profiles",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
