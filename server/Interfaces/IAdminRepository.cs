using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface IAdminRepository
    {
        Task<Admin> GetAdminByIdAsync(Guid adminId);
        Task<Admin> GetAdminByUsernameAsync(string username);
        Task<Admin> GetAdminByEmailAsync(string email);
        Task<IEnumerable<Admin>> GetAllAdminsAsync();
        Task AddAdminAsync(Admin admin);
        Task UpdateAdminAsync(Admin admin);
        Task DeleteAdminAsync(Guid adminId);
    }
}
