using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Models
{
    public class EmployeeJob
    {
        [Required]
        [MaxLength(10)]
        public string EmployeeId { get; set; }

        [Required]
        [MaxLength(10)]
        public string JobId { get; set; }

    }
}