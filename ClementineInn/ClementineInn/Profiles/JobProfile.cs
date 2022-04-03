using AutoMapper;
using ClementineInn.Dtos.Job;
using ClementineInn.Models;

namespace ClementineInn.Profiles
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            // source -> target
            CreateMap<Job, JobReadDto>();
            CreateMap<JobCreateDto, Job>();
            CreateMap<JobUpdateDto, Job>();
            CreateMap<Job, JobUpdateDto>();
        }
    }
}