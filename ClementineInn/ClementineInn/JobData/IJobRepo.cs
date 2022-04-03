using ClementineInn.Models;
using System.Collections.Generic;

namespace ClementineInn.JobData
{
    public interface IJobRepo
    {
        bool SaveChanges();

        IEnumerable<Job> GetAllJobs();
        Job GetJobById(string JobId);
        void CreateJob(Job Job);
        void UpdateJob(Job Job);
        void DeleteJob(Job Job);

    }
}