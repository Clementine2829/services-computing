using ClementineInn.Models;
using Microsoft.EntityFrameworkCore;

namespace ClementineInn.JobData
{
    public class JobContext : DbContext
    {
        public JobContext(DbContextOptions<JobContext> opt) : base(opt)
        {

        }

        public DbSet<Job> Jobs { get; set; }

    }
}