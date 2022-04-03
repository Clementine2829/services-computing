using ClementineInn.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClementineInn.CompanyData
{
    public class SqlCompanyRepo : ICompanyRepo
    {
        private readonly CompanyContext _contect;

        public SqlCompanyRepo(CompanyContext context)
        {
            _contect = context;
        }
        public void CreateCompany(Company company)
        {
            if (company == null)
            {
                throw new ArgumentNullException(nameof(company));
            }
            _contect.Companies.Add(company);
            _contect.SaveChanges();

        }

        public void DeleteCompany(Company company)
        {
            if (company == null)
            {
                throw new ArgumentNullException(nameof(company));
            }
            _contect.Companies.Remove(company);
        }

        public IEnumerable<Company> GetAllCompanies()
        {
            return _contect.Companies.ToList();
        }

        public Company GetCompanyById(string CompanyId)
        {
            return _contect.Companies.FirstOrDefault(p => p.CompanyId == CompanyId);
        }

        public bool SaveChanges()
        {
            return (_contect.SaveChanges() >= 0);

        }

        public void UpdateCompany(Company Company)
        {
            //Do nothing 
        }
    }
}