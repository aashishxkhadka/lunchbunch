using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.DTOs.Order;
using OneBottle.Interfaces;
using OneBottle.Mappers;

namespace OneBottle.Controller
{

    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IOrderRepository _orderRepo;

        public OrderController(AppDbContext context, IOrderRepository orderRepo)
        {
            _context = context;
            _orderRepo = orderRepo;
        }

        [HttpGet("/api/order/all")]
        public async Task<IActionResult> GetAllOrderAsync()
        {
            var orders = await _orderRepo.GetAllOrdersAsync();
            return Ok(orders);
        }


        [HttpGet("/api/order/{orderId}")]
        public async Task<IActionResult> GetOrderById(Guid orderId)
        {
            var order = await _orderRepo.GetOrderByIdAsync(orderId);
            return Ok(order);
        }

        [HttpGet("/api/order/user/{userId:guid}")]
        public async Task<IActionResult> GetOrderByUserId(Guid userId)
        {
            var order = await _orderRepo.GetOrdersByUserIdAsync(userId);
            return Ok(order);
        }

        [HttpPost("/api/order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDTO orderDTO)
        {

            await _orderRepo.AddOrderAsync(OrderMappers.ToOrderDTO(orderDTO));
            var order = await _orderRepo.GetOrderByIdAsync(orderDTO.OrderId);
            return Ok(order);
            // return CreatedAtAction(nameof(), new { orderId = order.orderId }, order.ToOrderDTO());

        }

        [HttpPut("/api/order/{orderId:guid}")]
        public async Task<IActionResult> UpdateOrderStatus(UpdateOrderDTO orderDTO, Guid orderId)
        {
            var order = await _orderRepo.GetOrderByIdAsync(orderId);
            order.OrderStatus = orderDTO.OrderStatus;
            await _orderRepo.UpdateOrderAsync(order);
            return Ok(orderDTO.OrderStatus);
        }

        //cancel order
        [HttpDelete("/api/order/{orderId:guid}")]
        public async Task<IActionResult> CancelOrder(Guid orderId)
        {
            var order = await _orderRepo.GetOrderByIdAsync(orderId);
            order.OrderStatus = "Cancelled";
            await _orderRepo.UpdateOrderAsync(order);
            return Ok();
        }
    }
}