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
                    MogucnostDostave = table.Column<bool>(type: "bit", nullable: true),
                    CenaDostave = table.Column<int>(type: "int", nullable: true),
                    BrojOcena = table.Column<int>(type: "int", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnikAgencijas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ZahtevZaKeterings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KonacnaCena = table.Column<int>(type: "int", nullable: false),
                    StatusRezervacije = table.Column<bool>(type: "bit", nullable: false),
                    DatumRezervacije = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZahtevZaKeterings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kategorijas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AgencijaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategorijas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kategorijas_KorisnikAgencijas_AgencijaId",
                        column: x => x.AgencijaId,
                        principalTable: "KorisnikAgencijas",
                        principalColumn: "Id");
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
                    Ocena = table.Column<double>(type: "float", nullable: true),
                    BrojOcena = table.Column<int>(type: "int", nullable: false),
                    ZauzetiDani = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VlasnikOglasaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OglasObjektas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OglasObjektas_KorisnikAgencijas_VlasnikOglasaId",
                        column: x => x.VlasnikOglasaId,
                        principalTable: "KorisnikAgencijas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MeniKeteringas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
<<<<<<<< HEAD:Aplikacija/backend/Migrations/20240428213627_v1.cs
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CenaMenija = table.Column<int>(type: "int", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SastavMenija = table.Column<string>(type: "nvarchar(max)", nullable: false),
========
                    Naslov = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CenaMenija = table.Column<int>(type: "int", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StavkeJela = table.Column<string>(type: "nvarchar(max)", nullable: false),
>>>>>>>> 4e0abd633e2eaf10dc97262a6eb0d1c4bf6d6cb0:Aplikacija/backend/Migrations/20240428212906_v1.cs
                    KategorijaId = table.Column<int>(type: "int", nullable: true),
                    ZahtevZaKeteringId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeniKeteringas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MeniKeteringas_Kategorijas_KategorijaId",
                        column: x => x.KategorijaId,
                        principalTable: "Kategorijas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MeniKeteringas_ZahtevZaKeterings_ZahtevZaKeteringId",
                        column: x => x.ZahtevZaKeteringId,
                        principalTable: "ZahtevZaKeterings",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KorisnikOglasObjekta",
                columns: table => new
                {
                    ListaKorisnikaOmiljeniOglasId = table.Column<int>(type: "int", nullable: false),
                    ListaOmiljenihOglasaObjekataId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnikOglasObjekta", x => new { x.ListaKorisnikaOmiljeniOglasId, x.ListaOmiljenihOglasaObjekataId });
                    table.ForeignKey(
                        name: "FK_KorisnikOglasObjekta_KorisnikAgencijas_ListaKorisnikaOmiljeniOglasId",
                        column: x => x.ListaKorisnikaOmiljeniOglasId,
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

            migrationBuilder.CreateTable(
                name: "ZakupljeniOglasi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OglasId = table.Column<int>(type: "int", nullable: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: false),
                    DatumZakupa = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZakupljenOd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZakupljenDo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZakupljeniOglas = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZakupljeniOglasi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ZakupljeniOglasi_KorisnikAgencijas_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "KorisnikAgencijas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ZakupljeniOglasi_OglasObjektas_OglasId",
                        column: x => x.OglasId,
                        principalTable: "OglasObjektas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ZakupljeniOglasi_ZahtevZaKeterings_ZakupljeniOglas",
                        column: x => x.ZakupljeniOglas,
                        principalTable: "ZahtevZaKeterings",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kategorijas_AgencijaId",
                table: "Kategorijas",
                column: "AgencijaId");

            migrationBuilder.CreateIndex(
                name: "IX_KorisnikOglasObjekta_ListaOmiljenihOglasaObjekataId",
                table: "KorisnikOglasObjekta",
                column: "ListaOmiljenihOglasaObjekataId");

            migrationBuilder.CreateIndex(
                name: "IX_MeniKeteringas_KategorijaId",
                table: "MeniKeteringas",
                column: "KategorijaId");

            migrationBuilder.CreateIndex(
                name: "IX_MeniKeteringas_ZahtevZaKeteringId",
                table: "MeniKeteringas",
                column: "ZahtevZaKeteringId");

            migrationBuilder.CreateIndex(
                name: "IX_OglasObjektas_VlasnikOglasaId",
                table: "OglasObjektas",
                column: "VlasnikOglasaId");

            migrationBuilder.CreateIndex(
                name: "IX_ZakupljeniOglasi_KorisnikId",
                table: "ZakupljeniOglasi",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_ZakupljeniOglasi_OglasId",
                table: "ZakupljeniOglasi",
                column: "OglasId");

            migrationBuilder.CreateIndex(
                name: "IX_ZakupljeniOglasi_ZakupljeniOglas",
                table: "ZakupljeniOglasi",
                column: "ZakupljeniOglas",
                unique: true,
                filter: "[ZakupljeniOglas] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KorisnikOglasObjekta");

            migrationBuilder.DropTable(
                name: "MeniKeteringas");

            migrationBuilder.DropTable(
                name: "ZakupljeniOglasi");

            migrationBuilder.DropTable(
                name: "Kategorijas");

            migrationBuilder.DropTable(
                name: "OglasObjektas");

            migrationBuilder.DropTable(
                name: "ZahtevZaKeterings");

            migrationBuilder.DropTable(
                name: "KorisnikAgencijas");
        }
    }
}
