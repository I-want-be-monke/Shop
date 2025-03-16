using DildoShop.Server.DataBase;
using DildoShop.Server.Kafka;
using DildoShop.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DildoShop.Server.Service
{
    public interface IProductService
    {
        Task<List<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> CreateProductAsync(Product product);
    }
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IKafkaProducerService _kafkaProducerService;

        public ProductService(AppDbContext context, IKafkaProducerService kafkaProducerService)
        {
            _context = context;
            _kafkaProducerService = kafkaProducerService;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

            if (string.IsNullOrEmpty(product.Name) ||
                string.IsNullOrEmpty(product.Image) ||
                string.IsNullOrEmpty(product.Category) ||
                string.IsNullOrEmpty(product.Description))
            {
                throw new ArgumentException("Все поля обязательны для заполнения.");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Отправка сообщения в Kafka
            var message = $"Создан продукт: {product.Name} (ID: {product.Id})";
            await _kafkaProducerService.SendMessageAsync("product_created", message);

            return product;
        }
    }
}
