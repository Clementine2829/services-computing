using AutoMapper;
using ClementineInn.UserData;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using Newtonsoft.Json.Serialization;
using ClementineInn.CompanyData;
using ClementineInn.JobData;
using ClementineInn.UserData.EmployeeJobData;
using ClementineInn.CompanyData.CompanyJobData;

namespace ClementineInn
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<UserContext>(opt => opt.UseSqlServer
           (Configuration.GetConnectionString("ClementineInnConnection")));

            services.AddDbContext<CompanyContext>(opt => opt.UseSqlServer
           (Configuration.GetConnectionString("ClementineInnConnection")));

            services.AddDbContext<JobContext>(opt => opt.UseSqlServer
           (Configuration.GetConnectionString("ClementineInnConnection")));

            services.AddDbContext<EmployeeJobContext>(opt => opt.UseSqlServer
           (Configuration.GetConnectionString("ClementineInnConnection")));

            services.AddDbContext<CompanyJobContext>(opt => opt.UseSqlServer
           (Configuration.GetConnectionString("ClementineInnConnection")));

            services.AddControllers().AddNewtonsoftJson(s => {
                s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
                    
            services.AddScoped<IUserRepo, SqlUserRepo>();
            services.AddScoped<ICompanyRepo, SqlCompanyRepo>();
            services.AddScoped<IJobRepo, SqlJobRepo>();
            services.AddScoped<IEmployeeJobRepo, SqlEmployeeJobRepo>();
            services.AddScoped<ICompanyJobRepo, SqlCompanyJobRepo>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
