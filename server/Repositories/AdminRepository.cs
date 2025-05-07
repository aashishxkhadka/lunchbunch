using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AppDbContext _context;

        public AdminRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Admin> GetAdminByIdAsync(Guid adminId)
        {
            return await _context.Admins.FindAsync(adminId);
        }

        public async Task<Admin> GetAdminByUsernameAsync(string username)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.Username == username);
        }

        public async Task<IEnumerable<Admin>> GetAllAdminsAsync()
        {
            return await _context.Admins.ToListAsync();
        }

        public async Task AddAdminAsync(Admin admin)
        {
            try
            {
                await _context.Admins.AddAsync(admin);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while adding the admin.", ex);
            }
        }

        public async Task UpdateAdminAsync(Admin admin)
        {
            try
            {
                _context.Admins.Update(admin);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while updating the admin.", ex);
            }
        }

        public async Task DeleteAdminAsync(Guid adminId)
        {
            var admin = await GetAdminByIdAsync(adminId);
            if (admin != null)
            {
                try
                {
                    _context.Admins.Remove(admin);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    // Log exception here
                    throw new Exception("An error occurred while deleting the admin.", ex);
                }
            }
        }

        public Task<Admin> GetAdminByEmailAsync(string email)
        {
            var admin = _context.Admins.FirstOrDefaultAsync(a => a.Email == email);
            return admin;
        }
    }
}