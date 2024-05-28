using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class v7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_ZahteviZaKetering_ZakupljeniOglas",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropIndex(
                name: "IX_ZakupljeniOglasi_ZakupljeniOglas",
                table: "ZakupljeniOglasi");

            migrationBuilder.RenameColumn(
                name: "ZakupljeniOglas",
                table: "ZakupljeniOglasi",
                newName: "ZakupljeniKetering");

            migrationBuilder.CreateIndex(
                name: "IX_ZakupljeniOglasi_ZakupljeniKetering",
                table: "ZakupljeniOglasi",
                column: "ZakupljeniKetering",
                unique: true,
                filter: "[ZakupljeniKetering] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_ZahteviZaKetering_ZakupljeniKetering",
                table: "ZakupljeniOglasi",
                column: "ZakupljeniKetering",
                principalTable: "ZahteviZaKetering",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_ZahteviZaKetering_ZakupljeniKetering",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropIndex(
                name: "IX_ZakupljeniOglasi_ZakupljeniKetering",
                table: "ZakupljeniOglasi");

            migrationBuilder.RenameColumn(
                name: "ZakupljeniKetering",
                table: "ZakupljeniOglasi",
                newName: "ZakupljeniOglas");

            migrationBuilder.CreateIndex(
                name: "IX_ZakupljeniOglasi_ZakupljeniOglas",
                table: "ZakupljeniOglasi",
                column: "ZakupljeniOglas",
                unique: true,
                filter: "[ZakupljeniOglas] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_ZahteviZaKetering_ZakupljeniOglas",
                table: "ZakupljeniOglasi",
                column: "ZakupljeniOglas",
                principalTable: "ZahteviZaKetering",
                principalColumn: "Id");
        }
    }
}
