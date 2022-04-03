using ClementineInn.Models;
using System.Collections.Generic;

namespace ClementineInn.UserData.EmployeeJobData
{
    public interface IEmployeeJobRepo
    {
        bool SaveChanges();

        IEnumerable<EmployeeJob> GetAllEmployeeJobsById(string UserId);
        EmployeeJob GetEmployeeJobById(string UserId);
        void CreateEmployeeJob(EmployeeJob EmployeeJob);
        void DeletEmployeeJob(EmployeeJob EmployeeJob);

    }
}