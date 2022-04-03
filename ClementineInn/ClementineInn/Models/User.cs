using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Models
{
    public class User
    {
        [Key]
        [MaxLength(10)]
        public string UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(150)]
        public string Email { get; set; }

        public string UserType { get; set; } 
    }
}