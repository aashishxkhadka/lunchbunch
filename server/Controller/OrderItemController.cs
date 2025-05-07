using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.Interfaces;

namespace OneBottle.Controller
{
    [ApiController]
    [Route("/api/orderitem")]
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItemRepository _orderItemRepo;
        private readonly AppDbContext _context;

        public OrderItemController(IOrderItemRepository orderItemRepo, AppDbContext context)
        {
            _orderItemRepo = orderItemRepo;
            _context = context;
        }
        [HttpGet("/")]
        public async Task<IActionResult> GetAllOrderItemsAsync(){
                var orderItems = await _orderItemRepo.GetOrderItemsByOrderIdAsync(Guid.Empty);
                return Ok(orderItems);
        }

    }
}