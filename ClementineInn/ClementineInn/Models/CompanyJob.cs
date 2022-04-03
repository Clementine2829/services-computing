using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Models
{
    public class CompanyJob
    {
        [Required]
        [MaxLength(10)]
        public string CompanyId { get; set; }

        [Required]
        [MaxLength(10)]
        public string JobId { get; set; }

    }
}