using Microsoft.AspNetCore.Mvc;
using OneBottle.Interfaces;
using OneBottle.Data;
using OneBottle.DTOs.User;
using OneBottle.Models;
using OneBottle.Mappers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace OneBottle.Controller
{
    [Route("/api/user")]
    [ApiController]
    public class UserController(AppDbContext context, IUserRepository userRepository, IConfiguration configuration) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IConfiguration _configuration = configuration;

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return Ok(users.Select(u => u.ToUserDTO()));
        }

        [HttpPost("/api/register")]
        public async Task<IActionResult> Register(CreateUserDTO userDTO)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            var userExists = _context.Users.Any(u => u.Email == userDTO.Email);
            if (userExists)
            {
                return BadRequest("User already exists.");
            }
            var user = new User
            {
                UserId = Guid.NewGuid(),
                Username = userDTO.Username,
                DateOfBirth = userDTO.DateOfBirth,
                Email = userDTO.Email,
                Password = hashedPassword,
            };
            await _userRepository.AddUserAsync(user);
            return Ok(user.ToUserDTO());
        }

        [HttpPost("/api/login")]
        public async Task<IActionResult> Login(UserLoginDTO userDTO)
        {
            var user = await _userRepository.GetUserByIdEmail(userDTO.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDTO.Password, user.Password))
            {
                return Unauthorized("Invalid email or password.");
            }
            var token = GenerateJwtToken(user);
            return Ok(new { Token = token, User = user.ToUserDTO() });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        [HttpDelete("/api/user/{userId:guid}")]
        public async Task<IActionResult> DeleteUserAsync(Guid userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            await _userRepository.DeleteUserAsync(userId);
            return NoContent();
        }

        [HttpGet("/api/user/{userId:guid}")]
        public async Task<IActionResult> GetUserByIdAsync(Guid userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.ToUserDTO());
        }
    }
}
