using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ClementineInn.JobData;
using ClementineInn.Dtos.Job;
using ClementineInn.Models;

namespace ClementineInn.Controllers
{
    //v1/jobs/
    //[Route("v1/[controller]")] //how to get to the APIs/controllers
    [ApiController] // out of the box behaviours
    public class JobsController : ControllerBase
    {
        private readonly IJobRepo _repository;
        private readonly IMapper _mapper;

        public JobsController(IJobRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //GET v1/jobs/
        [Route("v1/[controller]")]
        [HttpGet]
        public ActionResult<IEnumerable<Job>> GetAllJobs()
        {
            var jobs = _repository.GetAllJobs();
            return Ok(_mapper.Map<IEnumerable<JobReadDto>>(jobs));
        }

        //GET v1/jobs/{JobId}
        [Route("v1/[controller]")]
        [HttpGet("{JobId}", Name = "GetJobById")]
        public ActionResult<Job> GetJobById(string JobId)
        {
            var job = _repository.GetJobById(JobId);

            if (job != null) 
            {
                return Ok(_mapper.Map<JobReadDto>(job)); 
            } 
            return NotFound();
        }

        //POST v1/jobs
        [Route("v1/[controller]")]
        [HttpPost]
        public ActionResult<JobReadDto> CreateJob(JobCreateDto job)
        {

            if (job == null)
            {
                return NotFound();
            }
            job.JobId = RandomChars.RandomChars.GetRandomChars(10);

            var jobModel = _mapper.Map<Job>(job);

            _repository.CreateJob(jobModel);
            _repository.SaveChanges();

            var jobReadDto = _mapper.Map<JobReadDto>(jobModel);

            return CreatedAtRoute(nameof(GetJobById), new { jobId = jobReadDto.JobId }, jobReadDto);

        }

        //PATCH v1/jobs/{JobId}
        [Route("v1/[controller]")]
        [HttpPatch("{JobId}")]
        public ActionResult PartialJobUpdate(string JobId, JsonPatchDocument<JobUpdateDto> patchDoc)
        {
            var jobModelFromRepo = _repository.GetJobById(JobId);
            if(jobModelFromRepo == null)
            {
                return NotFound();
            }

            var jobToPatch = _mapper.Map<JobUpdateDto>(jobModelFromRepo);
            patchDoc.ApplyTo(jobToPatch, ModelState);
            if (!TryValidateModel(jobToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(jobToPatch, jobModelFromRepo); //both side has data, hence this kind of mapping 

            _repository.UpdateJob(jobModelFromRepo);
            _repository.SaveChanges();

            return NoContent();
        }

        //DELET v1/jobs/{JobId}
        [Route("v1/[controller]")]
        [HttpDelete("{JobId}")]
        public ActionResult DeleteJob(string JobId)
        {
            var jobModelFromRepo = _repository.GetJobById(JobId);
            if (jobModelFromRepo == null)
            {
                return NotFound();
            }
            _repository.DeleteJob(jobModelFromRepo);
            _repository.SaveChanges();
            return NoContent();
        }

    }
}