using Microsoft.EntityFrameworkCore;
using storeAPI.Models;

namespace storeAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // This will become the 'Products' table in the database
        public DbSet<Product> Products { get; set; }
    }
}