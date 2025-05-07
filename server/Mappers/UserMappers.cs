namespace OneBottle.Mappers
{
    using OneBottle.DTOs.User;
    using OneBottle.Models;

    public static class UserMappers
    {
        public static UserDTO ToUserDTO(this User user)
        {
            return new UserDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                Email = user.Email
            };
        }

        public static User ToCreateUserDTO(this CreateUserDTO userDTO)
        {
            return new User
            {
                Username = userDTO.Username,
                Email = userDTO.Email,
                Password = userDTO.Password
            };
        }
        public static User ToUserLoginDTO(this UserLoginDTO userLoginDto)
        {
            return new User
            {
                Username = userLoginDto.Email,
                Password = userLoginDto.Password
            };
        }
    }
}
