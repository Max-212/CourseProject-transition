using Microsoft.EntityFrameworkCore.Migrations;

namespace TMI_CourseWork_Itransition.Migrations
{
    public partial class FullTextIndexs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                sql: "CREATE FULLTEXT CATALOG ftCatalog AS DEFAULT;",
                suppressTransaction: true);

            migrationBuilder.Sql(
                sql: "CREATE FULLTEXT INDEX ON Items(Title) KEY INDEX PK_Items;",
                suppressTransaction: true);

            migrationBuilder.Sql(
                sql: "CREATE FULLTEXT INDEX ON Collections(Descriptions) KEY INDEX PK_Collections;",
                suppressTransaction: true);

            migrationBuilder.Sql(
                sql: "CREATE FULLTEXT INDEX ON Comments(Text) KEY INDEX PK_Comments;",
                suppressTransaction: true);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
