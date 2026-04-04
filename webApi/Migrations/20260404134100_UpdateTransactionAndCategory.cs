using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTransactionAndCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Persons_Id_Person",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Id_Category",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Id_Person",
                table: "Transactions",
                newName: "PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_Id_Person",
                table: "Transactions",
                newName: "IX_Transactions_PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Persons_PersonId",
                table: "Transactions",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Persons_PersonId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "PersonId",
                table: "Transactions",
                newName: "Id_Person");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_PersonId",
                table: "Transactions",
                newName: "IX_Transactions_Id_Person");

            migrationBuilder.AddColumn<int>(
                name: "Id_Category",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Persons_Id_Person",
                table: "Transactions",
                column: "Id_Person",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
