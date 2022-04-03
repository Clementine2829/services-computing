using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Models
{
    public class JobReadDto
    {
        public string JobId { get; set; }
        public string JobTitle{ get; set; }
        public string JobLocation { get; set; }

    }
}