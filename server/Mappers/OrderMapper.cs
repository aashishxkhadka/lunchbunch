namespace OneBottle.Mappers
{
    using OneBottle.DTOs.Order;
    using OneBottle.Models;

    public static class OrderMappers
    {
        public static Order ToOrderDTO(this CreateOrderDTO order)
        {
            return new Order 
            {
                OrderId = Guid.NewGuid(),
                UserId = order.UserId,
                ProductId = order.ProductId.ToArray(),
                OrderDate = DateTime.Now,
                OrderStatus = order.OrderStatus,
                TotalPrice = order.TotalPrice,
                ShippingAddress = order.ShippingAddress,
                BillingAddress = order.BillingAddress = order.ShippingAddress,
            };
        }

    }
}
