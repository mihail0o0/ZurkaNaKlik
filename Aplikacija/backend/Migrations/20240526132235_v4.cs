using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class v4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenijiKeteringa_ZahteviZaKetering_ZahtevZaKeteringId",
                table: "MenijiKeteringa");

            migrationBuilder.DropIndex(
                name: "IX_MenijiKeteringa_ZahtevZaKeteringId",
                table: "MenijiKeteringa");

            migrationBuilder.DropColumn(
                name: "ZahtevZaKeteringId",
                table: "MenijiKeteringa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ZahtevZaKeteringId",
                table: "MenijiKeteringa",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenijiKeteringa_ZahtevZaKeteringId",
                table: "MenijiKeteringa",
                column: "ZahtevZaKeteringId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenijiKeteringa_ZahteviZaKetering_ZahtevZaKeteringId",
                table: "MenijiKeteringa",
                column: "ZahtevZaKeteringId",
                principalTable: "ZahteviZaKetering",
                principalColumn: "Id");
        }
    }
}
