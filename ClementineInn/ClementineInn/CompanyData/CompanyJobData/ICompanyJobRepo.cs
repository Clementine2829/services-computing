using ClementineInn.Models;
using System.Collections.Generic;

namespace ClementineInn.CompanyData.CompanyJobData
{
    
    // This methods are only be used within the backend, to get internal information
    public interface ICompanyJobRepo
    {
        bool SaveChanges();

        IEnumerable<EmployeeJob> GetAllEmployeeJobsByTheirId(string UserId); //return list of jobs IDs
        EmployeeJob GetEmployeeJobByTheirId(string UserId); //return jobs ID
        void CreateEmployeeJob(EmployeeJob EmployeeJob);
        void DeletEmployeeJob(EmployeeJob EmployeeJob);

    }
}