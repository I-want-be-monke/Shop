using Confluent.Kafka;


namespace DildoShop.Server.Kafka
{
    public interface IKafkaProducerService
    {
        Task SendMessageAsync(string topic, string message);
    }

    public class KafkaProducerService : IKafkaProducerService
    {
        private readonly IProducer<Null, string> _producer;

        public KafkaProducerService(IProducer<Null, string> producer)
        {
            _producer = producer;
        }

        public async Task SendMessageAsync(string topic, string message)
        {
            try
            {
                await _producer.ProduceAsync(topic, new Message<Null, string> { Value = message });
            }
            catch (ProduceException<Null, string> e)
            {
                // Обработка ошибки
                Console.WriteLine($"Не удалось отправить сообщение: {e.Error.Reason}");
            }
        }
    }
}
