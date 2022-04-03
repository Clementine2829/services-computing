using ClementineInn.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClementineInn.UserData.EmployeeJobData
{
    public class SqlEmployeeJobRepo : IEmployeeJobRepo
    {
        private readonly EmployeeJobContext _contect;

        public SqlEmployeeJobRepo(EmployeeJobContext context)
        {
            _contect = context;
        }

        public void CreateEmployeeJob(EmployeeJob employeeJob)
        {
            if (employeeJob == null)
            {
                throw new ArgumentNullException(nameof(employeeJob));
            }
            _contect.EmployeeJobs.Add(employeeJob);
            _contect.SaveChanges();
        }


        public void DeletEmployeeJob(EmployeeJob employeeJob)
        {
            if (employeeJob == null)
            {
                throw new ArgumentNullException(nameof(employeeJob));
            }
            _contect.EmployeeJobs.Remove(employeeJob);

        }
        public IEnumerable<EmployeeJob> GetAllEmployeeJobsByTheirId(string UserId)
        {
            return _contect.EmployeeJobs.ToList().Where(u => u.EmployeeId == UserId);
        }

        public EmployeeJob GetEmployeeJobByTheirId(string UserId)
        {
            //return _contect.Users.FirstOrDefault(p => p.UserId == UserId);
            return _contect.EmployeeJobs.FirstOrDefault(p => p.EmployeeId == UserId);
        }

        public bool SaveChanges()
        {
            return (_contect.SaveChanges() >= 0);
        }
        
    }
}