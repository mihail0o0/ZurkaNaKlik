using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KorisnikAgencijas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrTel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LozinkaHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    SlikaProfila = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lokacija = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(21)", maxLength: 21, nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ocena = table.Column<int>(type: "int", nullable: true),
                    BrojOcena = table.Column<int>(type: "int", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnikAgencijas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OglasObjektas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListaTipProslava = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ListaTipProstora = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lokacija = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CenaPoDanu = table.Column<int>(type: "int", nullable: false),
                    BrojSoba = table.Column<int>(type: "int", nullable: false),
                    Kvadratura = table.Column<int>(type: "int", nullable: false),
                    BrojKreveta = table.Column<int>(type: "int", nullable: false),
                    BrojKupatila = table.Column<int>(type: "int", nullable: false),
                    Grejanje = table.Column<int>(type: "int", nullable: false),
                    ListDodatneOpreme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrTel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Slike = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ocena = table.Column<int>(type: "int", nullable: true),
                    BrojOcena = table.Column<int>(type: "int", nullable: false),
                    ZausetiDani = table.Column<DateTime>(type: "datetime2", nullable: true),
                    KorisnikId = table.Column<int>(type: "int", nullable: true),
                    KorisnikId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OglasObjektas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OglasObjektas_KorisnikAgencijas_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "KorisnikAgencijas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OglasObjektas_KorisnikAgencijas_KorisnikId1",
                        column: x => x.KorisnikId1,
                        principalTable: "KorisnikAgencijas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OglasObjektas_KorisnikId",
                table: "OglasObjektas",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_OglasObjektas_KorisnikId1",
                table: "OglasObjektas",
                column: "KorisnikId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OglasObjektas");

            migrationBuilder.DropTable(
                name: "KorisnikAgencijas");
        }
    }
}
