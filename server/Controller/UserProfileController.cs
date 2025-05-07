using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Controller
{
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserProfileController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("/api/userprofile/all")]
        public async Task<IActionResult> GetAllUsersProfile()
        {
            var users = await _context.UserProfiles.ToListAsync();
            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }


        [HttpGet("/api/userprofile/{profileId}")]
        public async Task<IActionResult> GetUserProfileById(Guid profileId)
        {
            var user = await _context.UserProfiles.FindAsync(profileId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("/api/userprofile/username/{username}")]
        public async Task<IActionResult> GetUserProfileByUsername(string username)
        {
            var user = await _context.UserProfiles.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }



        [HttpPost("/api/userprofile")]
        public async Task<IActionResult> AddUserProfile([FromBody] UserProfile user)
        {
            var newUser = new UserProfile
            {
                ProfileId = new Guid(),
                Username = user.Username,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                IdentificationType = user.IdentificationType,
                IdentificationNumber = user.IdentificationNumber
            };
            await _context.UserProfiles.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return Ok(newUser);
        }


        [HttpPut("/api/userprofile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserProfile user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            var userExists = await _context.UserProfiles.AnyAsync(u => u.ProfileId == user.ProfileId);
            if (!userExists)
            {
                return BadRequest("User doesn't exist.");
            }
            _context.UserProfiles.Update(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
    }
}
