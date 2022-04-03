using AutoMapper;
using ClementineInn.UserData;
using ClementineInn.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ClementineInn.Dtos.User;

namespace ClementineInn.Controllers
{
    //v1/employees/
    //[Route("v1/[controller]")] //how to get to the APIs/controllers
    [ApiController] // out of the box behaviours
    public class EmployeesController : ControllerBase
    {
        private readonly IUserRepo _repository;
        private readonly IMapper _mapper;
        private readonly string _userType = "Employee";

        public EmployeesController(IUserRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET v1/employees/
        [Route("v1/[controller]")]
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllEmployees()
        {
            var employees = _repository.GetAllUsersByType(_userType);
            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(employees));
        }

        //GET v1/employees/{UserId}
        [Route("v1/[controller]")]
        [HttpGet("{UserId}", Name = "GetEmployeesById")]
        public ActionResult<User> GetEmployeesById(string UserId)
        {
            var employee = _repository.GetUserById(UserId, _userType);

            if (employee != null) 
            {
                return Ok(_mapper.Map<UserReadDto>(employee)); 
            } 
            return NotFound();
            //return Ok(employee);
        }

        //POST v1/employee
        [Route("v1/[controller]")]
        [HttpPost]
        public ActionResult<UserReadDto> CreateUser(UserCreateDto user)
        {

            if (user == null)
            {
                return NotFound();
            }
            user.UserId = RandomChars.RandomChars.GetRandomChars(10);
            user.UserType = _userType;

            var userModel = _mapper.Map<User>(user);

            _repository.CreateUser(userModel);
            _repository.SaveChanges();

            var userReadDto = _mapper.Map<UserReadDto>(userModel);

            return CreatedAtRoute(nameof(GetEmployeesById), new { userId = userReadDto.UserId }, userReadDto);

        }

        //PATCH v1/employee/{UserId}
        [Route("v1/[controller]")]
        [HttpPatch("{UserId}")]
        public ActionResult PartialUserUpdate(string UserId, JsonPatchDocument<UserUpdateDto> patchDoc)
        {
            var userModelFromRepo = _repository.GetUserById(UserId, _userType);
            if(userModelFromRepo == null)
            {
                return NotFound();
            }

            var userToPatch = _mapper.Map<UserUpdateDto>(userModelFromRepo);
            patchDoc.ApplyTo(userToPatch, ModelState);
            if (!TryValidateModel(userToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(userToPatch, userModelFromRepo); //both side has data, hence this kind of mapping 

            _repository.UpdateUser(userModelFromRepo);
            _repository.SaveChanges();

            return NoContent();
        }

        //DELET v1/employee/{UserId}
        [Route("v1/[controller]")]
        [HttpDelete("{UserId}")]
        public ActionResult DeleteUser(string UserId)
        {
            var userModelFromRepo = _repository.GetUserById(UserId, _userType);
            if (userModelFromRepo == null)
            {
                return NotFound();
            }
            _repository.DeleteUser(userModelFromRepo);
            _repository.SaveChanges();
            return NoContent();
        }

    }
}