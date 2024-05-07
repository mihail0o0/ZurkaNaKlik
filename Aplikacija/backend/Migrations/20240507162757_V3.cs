using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class V3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kategorijas_KorisnikAgencijas_AgencijaId",
                table: "Kategorijas");

            migrationBuilder.DropForeignKey(
                name: "FK_KorisnikOglasObjekta_KorisnikAgencijas_ListaKorisnikaOmiljeniOglasId",
                table: "KorisnikOglasObjekta");

            migrationBuilder.DropForeignKey(
                name: "FK_KorisnikOglasObjekta_OglasObjektas_ListaOmiljenihOglasaObjekataId",
                table: "KorisnikOglasObjekta");

            migrationBuilder.DropForeignKey(
                name: "FK_MeniKeteringas_Kategorijas_KategorijaId",
                table: "MeniKeteringas");

            migrationBuilder.DropForeignKey(
                name: "FK_MeniKeteringas_ZahtevZaKeterings_ZahtevZaKeteringId",
                table: "MeniKeteringas");

            migrationBuilder.DropForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_VlasnikOglasaId",
                table: "OglasObjektas");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_KorisnikAgencijas_KorisnikId",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_OglasObjektas_OglasId",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_ZahtevZaKeterings_ZakupljeniOglas",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ZahtevZaKeterings",
                table: "ZahtevZaKeterings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OglasObjektas",
                table: "OglasObjektas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MeniKeteringas",
                table: "MeniKeteringas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KorisnikAgencijas",
                table: "KorisnikAgencijas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Kategorijas",
                table: "Kategorijas");

            migrationBuilder.RenameTable(
                name: "ZahtevZaKeterings",
                newName: "ZahteviZaKetering");

            migrationBuilder.RenameTable(
                name: "OglasObjektas",
                newName: "OglasiObjekta");

            migrationBuilder.RenameTable(
                name: "MeniKeteringas",
                newName: "MenijiKeteringa");

            migrationBuilder.RenameTable(
                name: "KorisnikAgencijas",
                newName: "KorisniciAgencije");

            migrationBuilder.RenameTable(
                name: "Kategorijas",
                newName: "Kategorije");

            migrationBuilder.RenameIndex(
                name: "IX_OglasObjektas_VlasnikOglasaId",
                table: "OglasiObjekta",
                newName: "IX_OglasiObjekta_VlasnikOglasaId");

            migrationBuilder.RenameIndex(
                name: "IX_MeniKeteringas_ZahtevZaKeteringId",
                table: "MenijiKeteringa",
                newName: "IX_MenijiKeteringa_ZahtevZaKeteringId");

            migrationBuilder.RenameIndex(
                name: "IX_MeniKeteringas_KategorijaId",
                table: "MenijiKeteringa",
                newName: "IX_MenijiKeteringa_KategorijaId");

            migrationBuilder.RenameIndex(
                name: "IX_Kategorijas_AgencijaId",
                table: "Kategorije",
                newName: "IX_Kategorije_AgencijaId");

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "KorisniciAgencije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "TokenCreated",
                table: "KorisniciAgencije",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TokenExpires",
                table: "KorisniciAgencije",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ZahteviZaKetering",
                table: "ZahteviZaKetering",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OglasiObjekta",
                table: "OglasiObjekta",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenijiKeteringa",
                table: "MenijiKeteringa",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KorisniciAgencije",
                table: "KorisniciAgencije",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kategorije",
                table: "Kategorije",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Kategorije_KorisniciAgencije_AgencijaId",
                table: "Kategorije",
                column: "AgencijaId",
                principalTable: "KorisniciAgencije",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KorisnikOglasObjekta_KorisniciAgencije_ListaKorisnikaOmiljeniOglasId",
                table: "KorisnikOglasObjekta",
                column: "ListaKorisnikaOmiljeniOglasId",
                principalTable: "KorisniciAgencije",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KorisnikOglasObjekta_OglasiObjekta_ListaOmiljenihOglasaObjekataId",
                table: "KorisnikOglasObjekta",
                column: "ListaOmiljenihOglasaObjekataId",
                principalTable: "OglasiObjekta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MenijiKeteringa_Kategorije_KategorijaId",
                table: "MenijiKeteringa",
                column: "KategorijaId",
                principalTable: "Kategorije",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MenijiKeteringa_ZahteviZaKetering_ZahtevZaKeteringId",
                table: "MenijiKeteringa",
                column: "ZahtevZaKeteringId",
                principalTable: "ZahteviZaKetering",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OglasiObjekta_KorisniciAgencije_VlasnikOglasaId",
                table: "OglasiObjekta",
                column: "VlasnikOglasaId",
                principalTable: "KorisniciAgencije",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_KorisniciAgencije_KorisnikId",
                table: "ZakupljeniOglasi",
                column: "KorisnikId",
                principalTable: "KorisniciAgencije",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_OglasiObjekta_OglasId",
                table: "ZakupljeniOglasi",
                column: "OglasId",
                principalTable: "OglasiObjekta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_ZahteviZaKetering_ZakupljeniOglas",
                table: "ZakupljeniOglasi",
                column: "ZakupljeniOglas",
                principalTable: "ZahteviZaKetering",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kategorije_KorisniciAgencije_AgencijaId",
                table: "Kategorije");

            migrationBuilder.DropForeignKey(
                name: "FK_KorisnikOglasObjekta_KorisniciAgencije_ListaKorisnikaOmiljeniOglasId",
                table: "KorisnikOglasObjekta");

            migrationBuilder.DropForeignKey(
                name: "FK_KorisnikOglasObjekta_OglasiObjekta_ListaOmiljenihOglasaObjekataId",
                table: "KorisnikOglasObjekta");

            migrationBuilder.DropForeignKey(
                name: "FK_MenijiKeteringa_Kategorije_KategorijaId",
                table: "MenijiKeteringa");

            migrationBuilder.DropForeignKey(
                name: "FK_MenijiKeteringa_ZahteviZaKetering_ZahtevZaKeteringId",
                table: "MenijiKeteringa");

            migrationBuilder.DropForeignKey(
                name: "FK_OglasiObjekta_KorisniciAgencije_VlasnikOglasaId",
                table: "OglasiObjekta");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_KorisniciAgencije_KorisnikId",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_OglasiObjekta_OglasId",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_ZahteviZaKetering_ZakupljeniOglas",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ZahteviZaKetering",
                table: "ZahteviZaKetering");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OglasiObjekta",
                table: "OglasiObjekta");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenijiKeteringa",
                table: "MenijiKeteringa");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KorisniciAgencije",
                table: "KorisniciAgencije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Kategorije",
                table: "Kategorije");

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "KorisniciAgencije");

            migrationBuilder.DropColumn(
                name: "TokenCreated",
                table: "KorisniciAgencije");

            migrationBuilder.DropColumn(
                name: "TokenExpires",
                table: "KorisniciAgencije");

            migrationBuilder.RenameTable(
                name: "ZahteviZaKetering",
                newName: "ZahtevZaKeterings");

            migrationBuilder.RenameTable(
                name: "OglasiObjekta",
                newName: "OglasObjektas");

            migrationBuilder.RenameTable(
                name: "MenijiKeteringa",
                newName: "MeniKeteringas");

            migrationBuilder.RenameTable(
                name: "KorisniciAgencije",
                newName: "KorisnikAgencijas");

            migrationBuilder.RenameTable(
                name: "Kategorije",
                newName: "Kategorijas");

            migrationBuilder.RenameIndex(
                name: "IX_OglasiObjekta_VlasnikOglasaId",
                table: "OglasObjektas",
                newName: "IX_OglasObjektas_VlasnikOglasaId");

            migrationBuilder.RenameIndex(
                name: "IX_MenijiKeteringa_ZahtevZaKeteringId",
                table: "MeniKeteringas",
                newName: "IX_MeniKeteringas_ZahtevZaKeteringId");

            migrationBuilder.RenameIndex(
                name: "IX_MenijiKeteringa_KategorijaId",
                table: "MeniKeteringas",
                newName: "IX_MeniKeteringas_KategorijaId");

            migrationBuilder.RenameIndex(
                name: "IX_Kategorije_AgencijaId",
                table: "Kategorijas",
                newName: "IX_Kategorijas_AgencijaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ZahtevZaKeterings",
                table: "ZahtevZaKeterings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OglasObjektas",
                table: "OglasObjektas",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MeniKeteringas",
                table: "MeniKeteringas",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KorisnikAgencijas",
                table: "KorisnikAgencijas",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kategorijas",
                table: "Kategorijas",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Kategorijas_KorisnikAgencijas_AgencijaId",
                table: "Kategorijas",
                column: "AgencijaId",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KorisnikOglasObjekta_KorisnikAgencijas_ListaKorisnikaOmiljeniOglasId",
                table: "KorisnikOglasObjekta",
                column: "ListaKorisnikaOmiljeniOglasId",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KorisnikOglasObjekta_OglasObjektas_ListaOmiljenihOglasaObjekataId",
                table: "KorisnikOglasObjekta",
                column: "ListaOmiljenihOglasaObjekataId",
                principalTable: "OglasObjektas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MeniKeteringas_Kategorijas_KategorijaId",
                table: "MeniKeteringas",
                column: "KategorijaId",
                principalTable: "Kategorijas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MeniKeteringas_ZahtevZaKeterings_ZahtevZaKeteringId",
                table: "MeniKeteringas",
                column: "ZahtevZaKeteringId",
                principalTable: "ZahtevZaKeterings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OglasObjektas_KorisnikAgencijas_VlasnikOglasaId",
                table: "OglasObjektas",
                column: "VlasnikOglasaId",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_KorisnikAgencijas_KorisnikId",
                table: "ZakupljeniOglasi",
                column: "KorisnikId",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_OglasObjektas_OglasId",
                table: "ZakupljeniOglasi",
                column: "OglasId",
                principalTable: "OglasObjektas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_ZahtevZaKeterings_ZakupljeniOglas",
                table: "ZakupljeniOglasi",
                column: "ZakupljeniOglas",
                principalTable: "ZahtevZaKeterings",
                principalColumn: "Id");
        }
    }
}
