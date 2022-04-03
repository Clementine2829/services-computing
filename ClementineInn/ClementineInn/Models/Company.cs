using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Models
{
    public class Company
    {
        [Key]
        public string CompanyId { get; set; }

        [Required]
        [MaxLength(30)]
        public string CompanyName { get; set; }

        [Required]
        [MaxLength(150)]
        public string CompanyAddress { get; set; }

        [Required]
        [MaxLength(10)]
        public string ManagerId { get; set; }

    }
}