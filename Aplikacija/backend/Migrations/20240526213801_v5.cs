using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class v5 : Migration
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

            migrationBuilder.CreateTable(
                name: "MeniKeteringaZahtevZaKetering",
                columns: table => new
                {
                    ListaZahetevaZaKeteringId = table.Column<int>(type: "int", nullable: false),
                    ZakupljeniMenijiId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeniKeteringaZahtevZaKetering", x => new { x.ListaZahetevaZaKeteringId, x.ZakupljeniMenijiId });
                    table.ForeignKey(
                        name: "FK_MeniKeteringaZahtevZaKetering_MenijiKeteringa_ZakupljeniMenijiId",
                        column: x => x.ZakupljeniMenijiId,
                        principalTable: "MenijiKeteringa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MeniKeteringaZahtevZaKetering_ZahteviZaKetering_ListaZahetevaZaKeteringId",
                        column: x => x.ListaZahetevaZaKeteringId,
                        principalTable: "ZahteviZaKetering",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MeniKeteringaZahtevZaKetering_ZakupljeniMenijiId",
                table: "MeniKeteringaZahtevZaKetering",
                column: "ZakupljeniMenijiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MeniKeteringaZahtevZaKetering");

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
