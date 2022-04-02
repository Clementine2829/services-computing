using ClementineInn.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClementineInn.Data
{
    public class SqlUserRepo : IUserRepo
    {
        private readonly UserContext _contect;

        public SqlUserRepo(UserContext context)
        {
            _contect = context;
        }

        public void CreateUser(User user)
        {
            if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            _contect.Users.Add(user);
            _contect.SaveChanges();
        }

        public void DeleteUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            _contect.Users.Remove(user);

        }

        public IEnumerable<User> GetAllUsersByType(string UserType)
        {
            return _contect.Users.ToList().Where(u => u.UserType == UserType);
            //return _contect.Users.ToList();
        }

        public User GetUserById(string UserId)
        {

            //return _contect.Users.FirstOrDefault(p => p.UserId == UserId);
            return _contect.Users.Where(p => p.UserType == "Employee").FirstOrDefault(p => p.UserId == UserId);
        }

        public bool SaveChanges()
        {
            return (_contect.SaveChanges() >= 0);
        }

        public void UpdateUser(User User)
        {
            //Do nothing
        }
    }
}