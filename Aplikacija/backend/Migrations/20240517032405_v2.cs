using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgencijaId",
                table: "ZahteviZaKetering",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ZahteviZaKetering_AgencijaId",
                table: "ZahteviZaKetering",
                column: "AgencijaId");

            migrationBuilder.AddForeignKey(
                name: "FK_ZahteviZaKetering_KorisniciAgencije_AgencijaId",
                table: "ZahteviZaKetering",
                column: "AgencijaId",
                principalTable: "KorisniciAgencije",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ZahteviZaKetering_KorisniciAgencije_AgencijaId",
                table: "ZahteviZaKetering");

            migrationBuilder.DropIndex(
                name: "IX_ZahteviZaKetering_AgencijaId",
                table: "ZahteviZaKetering");

            migrationBuilder.DropColumn(
                name: "AgencijaId",
                table: "ZahteviZaKetering");
        }
    }
}
