using ClementineInn.Models;
using Microsoft.EntityFrameworkCore;

namespace ClementineInn.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> opt) : base(opt)
        {

        }

        public DbSet<User> Users { get; set; }

    }
}