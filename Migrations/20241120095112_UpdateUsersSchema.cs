using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autoteenindus.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUsersSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Services_ServiceId",
                table: "Bookings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Services",
                table: "Services");

            migrationBuilder.RenameTable(
                name: "Services",
                newName: "Myservices");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "Password");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Myservices",
                table: "Myservices",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Myservices_ServiceId",
                table: "Bookings",
                column: "ServiceId",
                principalTable: "Myservices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Myservices_ServiceId",
                table: "Bookings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Myservices",
                table: "Myservices");

            migrationBuilder.RenameTable(
                name: "Myservices",
                newName: "Services");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "PasswordHash");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Services",
                table: "Services",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Services_ServiceId",
                table: "Bookings",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
