using OneBottle.Models;

namespace OneBottle.Interfaces
{
    public interface IUserProfileRepository
    {
        Task<User> GetUserByProfileIdAsync(Guid profileId);
        Task<User> GetUserByUsernameAsync(string username);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task AddUserAsync(UserProfile user);
        Task UpdateUserAsync(UserProfile user);
        Task DeleteProfileAsync (Guid profileId);
    }
}