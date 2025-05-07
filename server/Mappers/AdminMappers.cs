using OneBottle.DTOs.Admin;
using OneBottle.Models;

namespace OneBottle.Mappers
{
    public static class AdminMappers
    {
        // Map CreateAdminDTO to Admin model
        public static Admin ToAdminModel(CreateAdminDTO adminDto)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(adminDto.Password);
            return new Admin
            {
                AdminId = Guid.NewGuid(),
                Username = adminDto.Username,
                Email = adminDto.Email,
                Password = hashedPassword
            };
        }


        public static CreateAdminDTO CreateToAdminDTO(Admin admin)
        {
            return new CreateAdminDTO
            {
                AdminId = admin.AdminId,
                Username = admin.Username,
                Email = admin.Email,
            };
        }
        public static Admin ToAdminModelFromUpdate(UpdateAdminDTO adminDto, Guid adminId)
        {
            return new Admin
            {
                AdminId = adminId, // Set the existing ID
                Username = adminDto.Username,
                Email = adminDto.Email,
                Password = adminDto.Password // Handle password appropriately (e.g., hashing)
            };
        }

    }
}