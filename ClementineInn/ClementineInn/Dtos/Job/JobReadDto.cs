using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Dtos.Job
{
    public class JobReadDto
    {
        public string JobId { get; set; }
        public string JobTitle{ get; set; }
        public string JobLocation { get; set; }

    }
}