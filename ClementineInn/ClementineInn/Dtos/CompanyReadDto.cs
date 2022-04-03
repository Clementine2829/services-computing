using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Models
{
    public class CompanyReadDto
    {
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }

    }
}