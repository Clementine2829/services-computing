using ClementineInn.Models;
using System.Collections.Generic;

namespace ClementineInn.CompanyData
{
    public interface ICompanyRepo
    {
        bool SaveChanges();

        IEnumerable<Company> GetAllCompanies();
        Company GetCompanyById(string CompanyId);
        Company GetCompanyManagerById(string UserId);
        void CreateCompany(Company Company);
        void UpdateCompany(Company Company);
        void DeleteCompany(Company Company);

    }
}