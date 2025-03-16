using DildoShop.Server.Models;
using Confluent.Kafka;
using System.Text.Json;

namespace DildoShop.Server.Services
{
    public class CartService
    {
        private static Cart _cart = new Cart();
        private readonly IProducer<Null, string> _producer;

        public CartService(IProducer<Null, string> producer)
        {
            _producer = producer;
        }

        public Cart GetCart()
        {
            return _cart;
        }

        public void AddToCart(CartItem cartItem)
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

            
            var message = JsonSerializer.Serialize(cartItem);
            _producer.Produce("cart-topic", new Message<Null, string> { Value = message });
        }

        public void RemoveFromCart(int productId)
        {
            var item = _cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item != null)
            {
                _cart.Items.Remove(item);
            }

         
            var message = JsonSerializer.Serialize(new { ProductId = productId });
            _producer.Produce("cart-topic", new Message<Null, string> { Value = message });
        }
    }
}
