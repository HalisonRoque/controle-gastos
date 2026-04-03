using Microsoft.EntityFrameworkCore;
using webApi.Features.Categories.Entity;
using webApi.Features.Persons.Entity;
using webApi.Features.Transactions.Entity;

namespace webApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
