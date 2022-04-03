using ClementineInn.Models;
using Microsoft.EntityFrameworkCore;

namespace ClementineInn.CompanyData.CompanyJobData
{
    public class CompanyJobContext : DbContext
    {
        public CompanyJobContext(DbContextOptions<CompanyJobContext> opt) : base(opt)
        {

        }

        public DbSet<CompanyJob> CompanyJobs { get; set; }

    }
}