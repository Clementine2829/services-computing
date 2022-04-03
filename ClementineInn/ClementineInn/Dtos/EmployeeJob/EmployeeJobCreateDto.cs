using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Dtos.EmployeeJob
{
    public class EmployeeJobCreateDto
    {
        [Required]
        [MaxLength(10)]
        public string EmployeeId { get; set; }

        [Required]
        [MaxLength(10)]
        public string JobId { get; set; }

    }
}