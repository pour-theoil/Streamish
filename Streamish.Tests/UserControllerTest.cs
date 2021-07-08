using Streamish.Controllers;
using Streamish.Models;
using Streamish.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Streamish.Tests
{
    public class UserControllerTest
    {
        [Fact]
        public void Post_Method_Adds_A_New_UserProfile()
        {
            //Arrange
            var userCount = 20;
            var users = CreateTestUserProfiles(userCount);

            var repo = new InMemoryUserRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            var newUser = new UserProfile()
            {

                Name = $"User ",
                Email = $"user@example.com",
                DateCreated = DateTime.Today,
                ImageUrl = $"http://user.url/",

            };

            controller.Post(newUser);

            //Assert
            Assert.Equal(userCount + 1, repo.InternalData.Count);
        }


        [Fact]
        public void Delete_Method_Removes_A_User()
        {
            //Arrange
            var testUserId = 20;
            var users = CreateTestUserProfiles(4);
            users[0].Id = testUserId;

            var repo = new InMemoryUserRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            controller.Delete(testUserId);

            //Assert
            var UserFromDB = repo.InternalData.FirstOrDefault(u => u.Id == testUserId);

        }

        [Fact]
        public void Get_Returns_All_Users()
        {
            //Arrange 
            var usercount = 20;
            var users = CreateTestUserProfiles(usercount);

            var repo = new InMemoryUserRepository(users);
            var controler = new UserProfileController(repo);

            //Act 
            var result = controler.Get();

            //Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualusers = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(usercount, actualusers.Count);
            Assert.Equal(users, actualusers);
        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_id()
        {
            //Arrange
            var users = new List<UserProfile>();

            var repo = new InMemoryUserRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            var result = controller.Get(1);

            //Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Get_By_Id_Returns_User_With_Given_Id()
        {
            //Arrange
            var testUserId = 99;
            var users = CreateTestUserProfiles(4);
            users[0].Id = testUserId;

            var repo = new InMemoryUserRepository(users);
            var controller = new UserProfileController(repo);

            //Act
            var result = controller.Get(testUserId);

            //Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualuser = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testUserId, actualuser.Id);

        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Do_Not_Match()
        {
            //Arrange
            var testUserId = 99;
            var users = CreateTestUserProfiles(5);
            users[0].Id = testUserId;

            var repo = new InMemoryUserRepository(users);
            var controller = new UserProfileController(repo);

            var userToUpdate = new UserProfile()
            {
                Id = testUserId,
                Name = $"User ",
                Email = $"user@example.com",
                DateCreated = DateTime.Today,
                ImageUrl = $"http://user.url/",
            };

            var someOtherUserId = testUserId + 1;

            //Act
            var result = controller.Put(someOtherUserId, userToUpdate);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Put_Method_Updates_User()
        {
            //Arrange
            var testUserId = 99;
            var users = CreateTestUserProfiles(5);
            users[0].Id = testUserId;

            var repo = new InMemoryUserRepository(users);
            var controller = new UserProfileController(repo);

            var userToUpdate = new UserProfile()
            {
                Id = testUserId,
                Name = $"User ",
                Email = $"user@example.com",
                DateCreated = DateTime.Today,
                ImageUrl = $"http://user.com",
            };

            //Act
            controller.Put(testUserId, userToUpdate);


            //Assert
            var userFromDB = repo.InternalData.FirstOrDefault(u => u.Id == testUserId);
            Assert.NotNull(userFromDB);

            Assert.Equal(userToUpdate.Name, userFromDB.Name);
            Assert.Equal(userToUpdate.Email, userFromDB.Email);
            Assert.Equal(userToUpdate.DateCreated, userFromDB.DateCreated);
            Assert.Equal(userToUpdate.ImageUrl, userFromDB.ImageUrl);
        }

      

        private List<UserProfile> CreateTestUserProfiles(int count)
        {
            var users = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                users.Add(new UserProfile()
                {
                    Id = i,
                    Name = $"User {i}",
                    Email = $"user{i}@example.com",
                    DateCreated = DateTime.Today.AddDays(-i),
                    ImageUrl = $"http://user.url/{i}",
                });
            }
            return users;
        }
    }
}
