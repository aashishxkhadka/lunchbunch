using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.DTOs.Admin;
using OneBottle.Interfaces;
using OneBottle.Mappers;
using OneBottle.Models;


namespace OneBottle.Controller
{
    [Route("api/admin")]
    [ApiController]

    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAdminRepository _adminRepo;
        public AdminController(AppDbContext context, IAdminRepository adminRepo)
        {
            _context = context;
            _adminRepo = adminRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAdmin()
        {
            var admins = await _adminRepo.GetAllAdminsAsync();
            var adminsReturnedFromDb = admins.Select(admin => AdminMappers.CreateToAdminDTO(admin));
            return Ok(adminsReturnedFromDb);
        }

        [HttpGet("{adminId:guid}")]
        public async Task<IActionResult> GetById(Guid adminId)
        {
            var admin = await _adminRepo.GetAdminByIdAsync(adminId);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(AdminMappers.CreateToAdminDTO(admin));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var admin = await _adminRepo.GetAdminByUsernameAsync(username);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(AdminMappers.CreateToAdminDTO(admin));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminDTO adminDTO)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(adminDTO.Password);
            var admin = new Admin
            {
                AdminId = Guid.NewGuid(),
                Username = adminDTO.Username,
                Email = adminDTO.Email,
                Password = hashedPassword,
            };
            await _adminRepo.AddAdminAsync(admin);
            return Ok(AdminMappers.CreateToAdminDTO(admin));
            // var adminModel = AdminMappers.ToAdminModel(adminDTO);
            // await _adminRepo.AddAdminAsync(adminModel);
            // var createdAdminDTO = AdminMappers.CreateToAdminDTO(adminModel);
            // return CreatedAtAction(nameof(GetById), new { adminId = adminModel.AdminId }, createdAdminDTO); //toadminDTO defination is not found 
        }

        [HttpPost("/api/admin/login")]
        public async Task<IActionResult> Login([FromBody] AdminLoginDTO adminLoginDTO)
        {
            var admin = await _adminRepo.GetAdminByEmailAsync(adminLoginDTO.Email);
            if (admin == null || !BCrypt.Net.BCrypt.Verify(adminLoginDTO.Password, admin.Password))
            {
                return Unauthorized("Invalid username or password.");
            }
            // var token = GenerateJwtToken(admin);
            return Ok(AdminMappers.CreateToAdminDTO(admin));
            // return Ok(new { Token = token, Admin = AdminMappers.CreateToAdminDTO(admin) });
        }


        [HttpPut]
        [Route("{Id:guid}")]
        public async Task<IActionResult> UpdateAdmin([FromBody] UpdateAdminDTO newAdmin, Guid Id)
        {
            var existingAdmin = await _adminRepo.GetAdminByIdAsync(Id);
            if (existingAdmin == null)
            {
                return NotFound();
            }
            existingAdmin.Username = newAdmin.Username;
            existingAdmin.Email = newAdmin.Email;
            existingAdmin.Password = newAdmin.Password; 

            // var admin = AdminMappers.ToAdminModelFromUpdate(newAdmin, Id);
            await _adminRepo.UpdateAdminAsync(existingAdmin);
            return Ok(AdminMappers.CreateToAdminDTO(existingAdmin));
        }


        [HttpDelete]
        [Route("{adminId:guid}")]
        public async Task<IActionResult> DeleteAdmin(Guid adminId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var adminExist = await _adminRepo.GetAdminByIdAsync(adminId);
            if (adminExist == null)
            {
                return NotFound();
            }
            await _adminRepo.DeleteAdminAsync(adminId);
            return NoContent();
        }
    }
}
