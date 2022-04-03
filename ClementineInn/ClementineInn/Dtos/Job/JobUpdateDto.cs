using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Dtos.Job
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