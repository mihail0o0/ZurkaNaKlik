using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class v3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZausetiDani",
                table: "OglasObjektas");

            migrationBuilder.AddColumn<string>(
                name: "ZauzetiDani",
                table: "OglasObjektas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ZakupljeniOglas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OglasId = table.Column<int>(type: "int", nullable: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: false),
                    DatumZakupa = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZakupljenOd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZakupljenDo = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZakupljeniOglas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ZakupljeniOglas_KorisnikAgencijas_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "KorisnikAgencijas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ZakupljeniOglas_OglasObjektas_OglasId",
                        column: x => x.OglasId,
                        principalTable: "OglasObjektas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ZakupljeniOglas_KorisnikId",
                table: "ZakupljeniOglas",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_ZakupljeniOglas_OglasId",
                table: "ZakupljeniOglas",
                column: "OglasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ZakupljeniOglas");

            migrationBuilder.DropColumn(
                name: "ZauzetiDani",
                table: "OglasObjektas");

            migrationBuilder.AddColumn<DateTime>(
                name: "ZausetiDani",
                table: "OglasObjektas",
                type: "datetime2",
                nullable: true);
        }
    }
}
