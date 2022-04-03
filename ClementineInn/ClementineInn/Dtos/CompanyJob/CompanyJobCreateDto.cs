using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Dtos.CompanyJob
{
    public class CompanyJobCreateDto
    {
        [Required]
        [MaxLength(10)]
        public string CompanyId { get; set; }

        [Required]
        [MaxLength(10)]
        public string JobId { get; set; }

    }
}