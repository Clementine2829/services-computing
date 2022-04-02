using ClementineInn.Models;
using System.Collections.Generic;

namespace ClementineInn.Data
{
    public interface IUserRepo
    {
        bool SaveChanges();

        /*IEnumerable<User> GetAllUsers();*/
        IEnumerable<User> GetAllUsersByType(string UserType);
        User GetUserById(string UserId);
        void CreateUser(User User);



    }
}