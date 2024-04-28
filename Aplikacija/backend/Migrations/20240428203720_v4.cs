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
            migrationBuilder.RenameColumn(
                name: "StavkeJela",
                table: "MeniKeteringas",
                newName: "SastavMenija");

            migrationBuilder.RenameColumn(
                name: "Naslov",
                table: "MeniKeteringas",
                newName: "Naziv");

            migrationBuilder.AddColumn<int>(
                name: "KonacnaCena",
                table: "ZahtevZaKeterings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<double>(
                name: "Ocena",
                table: "OglasObjektas",
                type: "float",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KonacnaCena",
                table: "ZahtevZaKeterings");

            migrationBuilder.RenameColumn(
                name: "SastavMenija",
                table: "MeniKeteringas",
                newName: "StavkeJela");

            migrationBuilder.RenameColumn(
                name: "Naziv",
                table: "MeniKeteringas",
                newName: "Naslov");

            migrationBuilder.AlterColumn<int>(
                name: "Ocena",
                table: "OglasObjektas",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }
    }
}
