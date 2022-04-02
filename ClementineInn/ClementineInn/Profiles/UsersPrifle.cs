using AutoMapper;
using ClementineInn.Dtos;
using ClementineInn.Models;

namespace ClementineInn.Profiles
{
    public class UsersProfile : Profile
    {
        public UsersProfile()
        {
            // source -> target
            CreateMap<User, UserReadDto>();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<User, UserUpdateDto>();
        }
    }
}