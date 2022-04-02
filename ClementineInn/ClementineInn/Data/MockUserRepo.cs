using ClementineInn.Models;
using System.Collections.Generic;

namespace ClementineInn.Data
{
    public class MockUserRepo : IUserRepo
    {
        public void CreateUser(User User)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteUser(User User)
        {
            throw new System.NotImplementedException();
        }

        /*public IEnumerable<User> GetAllUsers()
{
   var users = new List<User> {
       new User { Id = "L80JSt936679", FirstName = "Clement", LastName = "Mamo", Email = "clementine@gmail.com", UserType = "Employee" },
       new User { Id = "OS9352KS9522", FirstName = "Pretty", LastName = "Jones", Email = "jones12@yahoo.com", UserType = "Employer" },
       new User { Id = "658IJSK233LS", FirstName = "John", LastName = "Doe", Email = "john@gmail.com", UserType = "Employee" }
   };
   return users;
}*/

        public IEnumerable<User> GetAllUsersByType(string UserType)
        {
            var users = new List<User> {
                new User { UserId = "L80JSt936679", FirstName = "Clement", LastName = "Mamo", Email = "clementine@gmail.com", UserType = "Employee" },
                new User { UserId = "658IJSK233LS", FirstName = "John", LastName = "Doe", Email = "john@gmail.com", UserType = "Employee" }
            };
            return users;
        }

        public User GetUserById(string UserId)
        {
            return new User { UserId = "L80JSt936679", FirstName = "Clement", LastName = "Mamo", Email = "Clementine@gmail.com", UserType = "Employee" };
        }

        public bool SaveChanges()
        {
            throw new System.NotImplementedException();
        }

        public void UpdateUser(User User)
        {
            throw new System.NotImplementedException();
        }
    }
}