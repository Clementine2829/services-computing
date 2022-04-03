using ClementineInn.Models;
using Microsoft.EntityFrameworkCore;

namespace ClementineInn.UserData.EmployeeJobData
{
    public class EmployeeJobContext : DbContext
    {
        public EmployeeJobContext(DbContextOptions<EmployeeJobContext> opt) : base(opt)
        {

        }

        public DbSet<EmployeeJob> EmployeeJobs { get; set; }

    }
}