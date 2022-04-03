using ClementineInn.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClementineInn.CompanyData.CompanyJobData
{
    public class SqlCompanyJobRepo : ICompanyJobRepo
    {
        private readonly CompanyJobContext _contect;

        public SqlCompanyJobRepo(CompanyJobContext context)
        {
            _contect = context;
        }

        public void CreateEmployeeJob(EmployeeJob EmployeeJob)
        {
            throw new NotImplementedException();
        }

        public void DeletEmployeeJob(EmployeeJob EmployeeJob)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<EmployeeJob> GetAllEmployeeJobsByTheirId(string UserId)
        {
            throw new NotImplementedException();
        }

        public EmployeeJob GetEmployeeJobByTheirId(string UserId)
        {
            throw new NotImplementedException();
        }

        /*  public void CreateEmployeeJob(EmployeeJob employeeJob)
          {
              if (employeeJob == null)
              {
                  throw new ArgumentNullException(nameof(employeeJob));
              }
             // _contect.EmployeeJobs.Add(employeeJob);
              _contect.SaveChanges();
          }


          public void DeletEmployeeJob(EmployeeJob employeeJob)
          {
              if (employeeJob == null)
              {
                  throw new ArgumentNullException(nameof(employeeJob));
              }
              //_contect.EmployeeJobs.Remove(employeeJob);

          }
          public IEnumerable<EmployeeJob> GetAllEmployeeJobsByTheirId(string UserId)
          {
              return _contect.CompanyJobs.ToList().Where(u => u.JobId == UserId);
          }

          public EmployeeJob GetEmployeeJobByTheirId(string UserId)
          {
              //return _contect.Users.FirstOrDefault(p => p.UserId == UserId);
              return _contect.CompanyJobs.FirstOrDefault(p => p.EmployeeId == UserId);
          }
          */
        public bool SaveChanges()
        {
            return (_contect.SaveChanges() >= 0);
        }
        
    }
}