using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Dtos.Company
{
    public class CompanyReadDto
    {
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }

    }
}