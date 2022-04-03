using AutoMapper;
using ClementineInn.UserData;
using ClementineInn.Dtos;
using ClementineInn.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ClementineInn.Controllers
{
    //v1/employers/
    [Route("v1/[controller]")] //how to get to the APIs/controllers
    [ApiController] // out of the box behaviours
    public class EmployersController : ControllerBase
    {
        private readonly IUserRepo _repository;
        private readonly IMapper _mapper;
        private readonly string _userType = "Employer";

        public EmployersController(IUserRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET v1/employers/
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllEmployers()
        {
            var employers = _repository.GetAllUsersByType(_userType);
            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(employers));
        }

        //GET v1/employers/{UserId}
        [HttpGet("{UserId}", Name = "GetEmployersById")]
        public ActionResult<User> GetEmployersById(string UserId)
        {
            var employer = _repository.GetUserById(UserId, _userType);

            if (employer != null)
            {
                return Ok(_mapper.Map<UserReadDto>(employer));
            }
            return NotFound();
        }

        //POST v1/employer
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

            return CreatedAtRoute(nameof(GetEmployersById), new { userId = userReadDto.UserId }, userReadDto);

        }

        //PATCH v1/employer/{UserId}
        [HttpPatch("{UserId}")]
        public ActionResult PartialUserUpdate(string UserId, JsonPatchDocument<UserUpdateDto> patchDoc)
        {
            var userModelFromRepo = _repository.GetUserById(UserId, _userType);
            if (userModelFromRepo == null)
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

        //DELET v1/employer/{UserId}
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