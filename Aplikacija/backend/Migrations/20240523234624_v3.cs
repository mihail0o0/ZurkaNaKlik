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
                name: "FK_ZakupljeniOglasi_KorisniciAgencije_KorisnikId",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_OglasiObjekta_OglasId",
                table: "ZakupljeniOglasi");

            migrationBuilder.AlterColumn<int>(
                name: "OglasId",
                table: "ZakupljeniOglasi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikId",
                table: "ZakupljeniOglasi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_KorisniciAgencije_KorisnikId",
                table: "ZakupljeniOglasi",
                column: "KorisnikId",
                principalTable: "KorisniciAgencije",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ZakupljeniOglasi_OglasiObjekta_OglasId",
                table: "ZakupljeniOglasi",
                column: "OglasId",
                principalTable: "OglasiObjekta",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_KorisniciAgencije_KorisnikId",
                table: "ZakupljeniOglasi");

            migrationBuilder.DropForeignKey(
                name: "FK_ZakupljeniOglasi_OglasiObjekta_OglasId",
                table: "ZakupljeniOglasi");

            migrationBuilder.AlterColumn<int>(
                name: "OglasId",
                table: "ZakupljeniOglasi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikId",
                table: "ZakupljeniOglasi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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
        }
    }
}
