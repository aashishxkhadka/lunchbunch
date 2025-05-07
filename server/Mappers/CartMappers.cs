namespace OneBottle.DTOs.Cart
{
    using OneBottle.Models;
    using OneBottle.Mappers;
    public static class CartMapper
    {
        public static Cart ToCartModel(this CreateCartDto cart)
        {
            return new Cart
            {
                CartId = Guid.NewGuid(), // Use Guid.NewGuid() for new CartId
                ProductId = cart.ProductId,
                UserId = cart.UserId,
                Quantity = cart.Quantity,
            };
        }

        public static CartDto ToCartDTO(Cart cart)
        {
            return new CartDto
            {
                CartId = cart.CartId,
                UserId = cart.UserId,
                ProductId = cart.ProductId,
                Product = cart.Product?.ToProductDTO(),
                Quantity = cart.Quantity,
            };
        }
    }
}