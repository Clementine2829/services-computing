using ClementineInn.Models;
using Microsoft.EntityFrameworkCore;

namespace ClementineInn.CompanyData
{
    public class CompanyContext : DbContext
    {
        public CompanyContext(DbContextOptions<CompanyContext> opt) : base(opt)
        {

        }

        public DbSet<Company> Companies { get; set; }

    }
}