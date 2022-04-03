using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Dtos.Company
{
    public class CompanyCreateDto
    {
        [MaxLength(10)]
        public string CompanyId { get; set; }

        [Required]
        [MaxLength(30)]
        public string CompanyName { get; set; }

        [Required]
        [MaxLength(150)]
        public string CompanyAddress { get; set; }

        [MaxLength(10)]
        public string ManagerId { get; set; }

    }
}