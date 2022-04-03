using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Models
{
    public class JobUpdateDto
    {

        [Required]
        [MaxLength(100)]
        public string JobTitle { get; set; }

        [Required]
        [MaxLength(150)]
        public string JobLocation { get; set; }

    }
}