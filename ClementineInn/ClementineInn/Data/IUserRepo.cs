using ClementineInn.Models;
using System.Collections.Generic;

namespace ClementineInn.Data
{
    public interface IUserRepo
    {
        bool SaveChanges();

        /*IEnumerable<User> GetAllUsers();*/
        IEnumerable<User> GetAllUsersByType(string UserType);
        User GetUserById(string UserId, string UserType);
        void CreateUser(User User);
        void UpdateUser(User User);
        void DeleteUser(User User);



    }
}