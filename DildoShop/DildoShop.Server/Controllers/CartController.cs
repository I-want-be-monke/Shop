using DildoShop.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace DildoShop.Server.Controllers
{
        [ApiController]
        [Route("api/[controller]")]
        public class CartController : ControllerBase
        {
            private static Cart _cart = new Cart();

            [HttpGet]
            public ActionResult<Cart> GetCart()
            {
                return Ok(_cart);
            }

            [HttpPost("add")]
            public ActionResult AddToCart([FromBody] CartItem cartItem)
            {
                var existingItem = _cart.Items.FirstOrDefault(i => i.ProductId == cartItem.ProductId);
                if (existingItem != null)
                {
                    existingItem.Quantity += cartItem.Quantity;
                }
                else
                {
                    _cart.Items.Add(cartItem);
                }

                return Ok(_cart);
            }

            [HttpDelete("remove/{productId}")]
            public ActionResult RemoveFromCart(int productId)
            {
                var item = _cart.Items.FirstOrDefault(i => i.ProductId == productId);
                if (item != null)
                {
                    _cart.Items.Remove(item);
                }

                return Ok(_cart);
            }
        }
}
