using ClementineInn.Models;
using Microsoft.EntityFrameworkCore;

namespace ClementineInn.UserData
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> opt) : base(opt)
        {

        }

        public DbSet<User> Users { get; set; }

    }
}