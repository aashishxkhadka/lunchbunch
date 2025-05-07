using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Order
{
    public class UpdateOrderDTO
    {
        [Required]
        public string OrderStatus { get; set; } = string.Empty;
    }
}