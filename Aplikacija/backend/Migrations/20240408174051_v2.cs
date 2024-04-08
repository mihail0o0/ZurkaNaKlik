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
            migrationBuilder.DropForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_KorisnikId",
                table: "OglasObjektas");

            migrationBuilder.DropForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_KorisnikId1",
                table: "OglasObjektas");

            migrationBuilder.DropIndex(
                name: "IX_OglasObjektas_KorisnikId",
                table: "OglasObjektas");

            migrationBuilder.DropColumn(
                name: "KorisnikId",
                table: "OglasObjektas");

            migrationBuilder.RenameColumn(
                name: "KorisnikId1",
                table: "OglasObjektas",
                newName: "VlasnikOglasaId");

            migrationBuilder.RenameIndex(
                name: "IX_OglasObjektas_KorisnikId1",
                table: "OglasObjektas",
                newName: "IX_OglasObjektas_VlasnikOglasaId");

            migrationBuilder.CreateTable(
                name: "KorisnikOglasObjekta",
                columns: table => new
                {
                    ListaKorisnikaKojimaJeOmiljeniOglasId = table.Column<int>(type: "int", nullable: false),
                    ListaOmiljenihOglasaObjekataId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnikOglasObjekta", x => new { x.ListaKorisnikaKojimaJeOmiljeniOglasId, x.ListaOmiljenihOglasaObjekataId });
                    table.ForeignKey(
                        name: "FK_KorisnikOglasObjekta_KorisnikAgencijas_ListaKorisnikaKojimaJeOmiljeniOglasId",
                        column: x => x.ListaKorisnikaKojimaJeOmiljeniOglasId,
                        principalTable: "KorisnikAgencijas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KorisnikOglasObjekta_OglasObjektas_ListaOmiljenihOglasaObjekataId",
                        column: x => x.ListaOmiljenihOglasaObjekataId,
                        principalTable: "OglasObjektas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KorisnikOglasObjekta_ListaOmiljenihOglasaObjekataId",
                table: "KorisnikOglasObjekta",
                column: "ListaOmiljenihOglasaObjekataId");

            migrationBuilder.AddForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_VlasnikOglasaId",
                table: "OglasObjektas",
                column: "VlasnikOglasaId",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_VlasnikOglasaId",
                table: "OglasObjektas");

            migrationBuilder.DropTable(
                name: "KorisnikOglasObjekta");

            migrationBuilder.RenameColumn(
                name: "VlasnikOglasaId",
                table: "OglasObjektas",
                newName: "KorisnikId1");

            migrationBuilder.RenameIndex(
                name: "IX_OglasObjektas_VlasnikOglasaId",
                table: "OglasObjektas",
                newName: "IX_OglasObjektas_KorisnikId1");

            migrationBuilder.AddColumn<int>(
                name: "KorisnikId",
                table: "OglasObjektas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OglasObjektas_KorisnikId",
                table: "OglasObjektas",
                column: "KorisnikId");

            migrationBuilder.AddForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_KorisnikId",
                table: "OglasObjektas",
                column: "KorisnikId",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_KorisnikId1",
                table: "OglasObjektas",
                column: "KorisnikId1",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id");
        }
    }
}
