﻿using AutoMapper;
using ClementineInn.Dtos.Company;
using ClementineInn.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ClementineInn.CompanyData;
using ClementineInn.Dtos.User;

namespace ClementineInn.Controllers
{
    //v1/companies/
    //[Route("v1/[controller]")] //how to get to the APIs/controllers
    [ApiController] // out of the box behaviours
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyRepo _repository;
        private readonly IMapper _mapper;

        public CompaniesController(ICompanyRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET v1/companies/
        [Route("v1/[controller]")] //how to get to the APIs/controllers
        [HttpGet]
        public ActionResult<IEnumerable<Company>> GetAllCompanies()
        {
            var companies = _repository.GetAllCompanies();
            return Ok(_mapper.Map<IEnumerable<CompanyReadDto>>(companies));
        }

        //GET v1/companies/{CompanyId}
        [Route("v1/[controller]")] //how to get to the APIs/controllers
        [HttpGet("{CompanyId}", Name = "GetCompanyById")]
        public ActionResult<Company> GetCompanyById(string CompanyId)
        {
            var company = _repository.GetCompanyById(CompanyId);
            if (company != null) 
            {
                return Ok(_mapper.Map<CompanyReadDto>(company)); 
            } 
            return NotFound();
        }
 
        //GET v1/employers/{UserId}/companies
        [Route("v1/employers/{UserId}/{companies}")]
        [HttpGet("{UserId}", Name = "GetCompanyManagedById")]
        public ActionResult<Company> GetCompanyManagedById(string UserId)
        {
            var employer = _repository.GetCompanyManagerById(UserId); 

            if (employer != null)
            {
                return Ok(_mapper.Map<CompanyReadDto>(employer));
            }
            return NotFound();
        }

        //POST v1/companies
        [Route("v1/[controller]")] //how to get to the APIs/controllers
        [HttpPost]
        public ActionResult<CompanyReadDto> CreateCompany(CompanyCreateDto company)
        {

            if (company == null)
            {
                return NotFound();
            }
            company.CompanyId = RandomChars.RandomChars.GetRandomChars(10);

            var companyModel = _mapper.Map<Company>(company);

            _repository.CreateCompany(companyModel);
            _repository.SaveChanges();

            var companyReadDto = _mapper.Map<CompanyReadDto>(companyModel);

            return CreatedAtRoute(nameof(GetCompanyById), new { companyId = companyReadDto.CompanyId }, companyReadDto);

        }

        //PATCH v1/companies/{CompanyId}
        [Route("v1/[controller]")] //how to get to the APIs/controllers
        [HttpPatch("{CompanyId}")]
        public ActionResult PartialCompanyUpdate(string CompanyId, JsonPatchDocument<CompanyUpdateDto> patchDoc)
        {
            var companyModelFromRepo = _repository.GetCompanyById(CompanyId);
            if(companyModelFromRepo == null)
            {
                return NotFound();
            }

            var companyToPatch = _mapper.Map<CompanyUpdateDto>(companyModelFromRepo);
            patchDoc.ApplyTo(companyToPatch, ModelState);
            if (!TryValidateModel(companyToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(companyToPatch, companyModelFromRepo); //both side has data, hence this kind of mapping 

            _repository.UpdateCompany(companyModelFromRepo);
            _repository.SaveChanges();

            return NoContent();
        }

        //DELET v1/companies/{CompanyId}
        [Route("v1/[controller]")] //how to get to the APIs/controllers
        [HttpDelete("{CompanyId}")]
        public ActionResult DeleteCompany(string CompanyId)
        {
            var companyModelFromRepo = _repository.GetCompanyById(CompanyId);
            if (companyModelFromRepo == null)
            {
                return NotFound();
            }
            _repository.DeleteCompany(companyModelFromRepo);
            _repository.SaveChanges();
            return NoContent();
        }
    }
}