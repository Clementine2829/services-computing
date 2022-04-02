using AutoMapper;
using ClementineInn.Data;
using ClementineInn.Dtos;
using ClementineInn.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ClementineInn.Controllers
{
    //v1/employees/
    [Route("v1/[controller]")] //how to get to the APIs/controllers
    [ApiController] // out of the box behaviours
    public class EmployeesController : ControllerBase
    {
        private readonly IUserRepo _repository;
        private readonly IMapper _mapper;

        public EmployeesController(IUserRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET v1/employees/
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllEmployees()
        {
            var employees = _repository.GetAllUsersByType("Employee");
            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(employees));
        }

        //GET v1/employees/{Id}
        [HttpGet("{UserId}", Name = "GetEmployeesById")]
        public ActionResult<User> GetEmployeesById(string UserId)
        {
            var employee = _repository.GetUserById(UserId);

            if (employee != null) 
            {
                return Ok(_mapper.Map<UserReadDto>(employee)); 
            } 
            return NotFound();
            //return Ok(employee);
        }

        //POST v1/employee
        public ActionResult<UserReadDto> CreateUser(UserCreateDto user)
        {

            if (user == null)
            {
                return NotFound();
            }
            user.UserId = RandomChars.RandomChars.GetRandomChars(10);
            user.UserType = "Employee";

            var userModel = _mapper.Map<User>(user);

            _repository.CreateUser(userModel);
            _repository.SaveChanges();

            var userReadDto = _mapper.Map<UserReadDto>(userModel);

            return CreatedAtRoute(nameof(GetEmployeesById), new { userId = userReadDto.UserId }, userReadDto);

        }

    }
}