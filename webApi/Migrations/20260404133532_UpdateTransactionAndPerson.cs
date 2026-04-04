using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTransactionAndPerson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Persons_personid",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_personid",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "category",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "type",
                table: "Transactions",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "id_person",
                table: "Transactions",
                newName: "Id_Person");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Transactions",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Transactions",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "personid",
                table: "Transactions",
                newName: "Id_Category");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Persons",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "age",
                table: "Persons",
                newName: "Age");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Persons",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "purpose",
                table: "Categories",
                newName: "Purpose");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Categories",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Categories",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transactions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_Id_Person",
                table: "Transactions",
                column: "Id_Person");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Categories_CategoryId",
                table: "Transactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Persons_Id_Person",
                table: "Transactions",
                column: "Id_Person",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Categories_CategoryId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Persons_Id_Person",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_Id_Person",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Transactions",
                newName: "type");

            migrationBuilder.RenameColumn(
                name: "Id_Person",
                table: "Transactions",
                newName: "id_person");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Transactions",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Transactions",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id_Category",
                table: "Transactions",
                newName: "personid");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Persons",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Age",
                table: "Persons",
                newName: "age");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Persons",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Purpose",
                table: "Categories",
                newName: "purpose");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Categories",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Categories",
                newName: "id");

            migrationBuilder.AddColumn<string>(
                name: "category",
                table: "Transactions",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_personid",
                table: "Transactions",
                column: "personid");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Persons_personid",
                table: "Transactions",
                column: "personid",
                principalTable: "Persons",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
