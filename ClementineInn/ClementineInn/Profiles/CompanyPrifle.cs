using AutoMapper;
using ClementineInn.Dtos.Company;
using ClementineInn.Models;

namespace ClementineInn.Profiles
{
    public class CompanyProfile : Profile
    {
        public CompanyProfile()
        {
            // source -> target
            CreateMap<Company, CompanyReadDto>();
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<CompanyUpdateDto, Company>();
            CreateMap<Company, CompanyUpdateDto>();
        }
    }
}