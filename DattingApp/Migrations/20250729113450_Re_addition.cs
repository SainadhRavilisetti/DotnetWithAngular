using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DattingApp.Migrations
{
    /// <inheritdoc />
    public partial class Re_addition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photos_profie_Members_membersId",
                table: "photos");

            migrationBuilder.DropIndex(
                name: "IX_photos_membersId",
                table: "photos");

            migrationBuilder.DropColumn(
                name: "membersId",
                table: "photos");

            migrationBuilder.CreateIndex(
                name: "IX_photos_MemberId",
                table: "photos",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_photos_profie_Members_MemberId",
                table: "photos",
                column: "MemberId",
                principalTable: "profie_Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photos_profie_Members_MemberId",
                table: "photos");

            migrationBuilder.DropIndex(
                name: "IX_photos_MemberId",
                table: "photos");

            migrationBuilder.AddColumn<string>(
                name: "membersId",
                table: "photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_photos_membersId",
                table: "photos",
                column: "membersId");

            migrationBuilder.AddForeignKey(
                name: "FK_photos_profie_Members_membersId",
                table: "photos",
                column: "membersId",
                principalTable: "profie_Members",
                principalColumn: "Id");
        }
    }
}
