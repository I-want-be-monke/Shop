using DildoShop.Server.Models;
using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;

namespace DildoShop.Server.DataBase
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
