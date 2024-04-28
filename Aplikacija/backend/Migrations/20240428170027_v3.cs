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
            migrationBuilder.DropForeignKey(
                name: "FK_MeniKeteringas_KorisnikAgencijas_AgencijaId",
                table: "MeniKeteringas");

            migrationBuilder.DropIndex(
                name: "IX_MeniKeteringas_AgencijaId",
                table: "MeniKeteringas");

            migrationBuilder.DropColumn(
                name: "CenaPoOsobi",
                table: "MeniKeteringas");

            migrationBuilder.RenameColumn(
                name: "AgencijaId",
                table: "MeniKeteringas",
                newName: "CenaMenija");

            migrationBuilder.AddColumn<int>(
                name: "KategorijaId",
                table: "MeniKeteringas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StavkeJela",
                table: "MeniKeteringas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<int>(
                name: "CenaDostave",
                table: "KorisnikAgencijas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "MogucnostDostave",
                table: "KorisnikAgencijas",
                type: "bit",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_MeniKeteringas_KategorijaId",
                table: "MeniKeteringas",
                column: "KategorijaId");

            migrationBuilder.CreateIndex(
                name: "IX_Kategorijas_AgencijaId",
                table: "Kategorijas",
                column: "AgencijaId");

            migrationBuilder.AddForeignKey(
                name: "FK_MeniKeteringas_Kategorijas_KategorijaId",
                table: "MeniKeteringas",
                column: "KategorijaId",
                principalTable: "Kategorijas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MeniKeteringas_Kategorijas_KategorijaId",
                table: "MeniKeteringas");

            migrationBuilder.DropTable(
                name: "Kategorijas");

            migrationBuilder.DropIndex(
                name: "IX_MeniKeteringas_KategorijaId",
                table: "MeniKeteringas");

            migrationBuilder.DropColumn(
                name: "KategorijaId",
                table: "MeniKeteringas");

            migrationBuilder.DropColumn(
                name: "StavkeJela",
                table: "MeniKeteringas");

            migrationBuilder.DropColumn(
                name: "CenaDostave",
                table: "KorisnikAgencijas");

            migrationBuilder.DropColumn(
                name: "MogucnostDostave",
                table: "KorisnikAgencijas");

            migrationBuilder.RenameColumn(
                name: "CenaMenija",
                table: "MeniKeteringas",
                newName: "AgencijaId");

            migrationBuilder.AddColumn<double>(
                name: "CenaPoOsobi",
                table: "MeniKeteringas",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_MeniKeteringas_AgencijaId",
                table: "MeniKeteringas",
                column: "AgencijaId");

            migrationBuilder.AddForeignKey(
                name: "FK_MeniKeteringas_KorisnikAgencijas_AgencijaId",
                table: "MeniKeteringas",
                column: "AgencijaId",
                principalTable: "KorisnikAgencijas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
