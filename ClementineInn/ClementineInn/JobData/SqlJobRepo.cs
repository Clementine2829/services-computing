using ClementineInn.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClementineInn.JobData
{
    public class SqlJobRepo : IJobRepo
    {
        private readonly JobContext _contect;

        public SqlJobRepo (JobContext context)
        {
            _contect = context;
        }
        public void CreateJob(Job job)
        {
            if (job == null)
            {
                throw new ArgumentNullException(nameof(job));
            }
            _contect.Jobs.Add(job);
            _contect.SaveChanges();

        }

        public void DeleteJob(Job job)
        {
            if (job == null)
            {
                throw new ArgumentNullException(nameof(job));
            }
            _contect.Jobs.Remove(job);
        }

        public IEnumerable<Job> GetAllJobs()
        {
            return _contect.Jobs.ToList();
        }

        public Job GetJobById(string JobId)
        {
            return _contect.Jobs.FirstOrDefault(p => p.JobId == JobId);
        }

        public bool SaveChanges()
        {
            return (_contect.SaveChanges() >= 0);

        }

        public void UpdateJob(Job job)
        {
            //Do nothing 
        }
    }
}