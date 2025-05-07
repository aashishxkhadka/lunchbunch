using System.ComponentModel.DataAnnotations;
using OneBottle.DTOs.Product;

namespace OneBottle.DTOs.Order
{
    public class CreateOrderDTO
    {
        public Guid OrderId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid[] ProductId { get; set; } = Array.Empty<Guid>();
        // public ProductDTO[] Product { get; set; } = Array.Empty<ProductDTO>();

        [Required]
        public DateTime OrderDate { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        public string OrderStatus { get; set; } = string.Empty;

        [Required, DataType(DataType.Text)]
        public string ShippingAddress { get; set; } = string.Empty;
        public string BillingAddress { get; set; } = string.Empty;
    }
}