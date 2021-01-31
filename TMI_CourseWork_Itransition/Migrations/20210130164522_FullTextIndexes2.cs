using Microsoft.EntityFrameworkCore.Migrations;

namespace TMI_CourseWork_Itransition.Migrations
{
    public partial class FullTextIndexes2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                sql: "CREATE FULLTEXT INDEX ON CustomFieldValue(Value) KEY INDEX PK_CustomFieldValue;",
                suppressTransaction: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
