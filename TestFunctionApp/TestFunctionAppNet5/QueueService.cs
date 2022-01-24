using System.Threading.Tasks;

using Azure.Storage.Queues;

namespace TestFunctionAppNet5
{
    public class QueueService
    {
        private const string QueueName = "testqueue";

        private readonly string connectionString;

        public QueueService(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task QueueDataAsync(string data)
        {
            var queueClient = new QueueClient(
                connectionString,
                QueueName,
                new QueueClientOptions {MessageEncoding = QueueMessageEncoding.Base64});

            await queueClient.CreateIfNotExistsAsync();

            if (await queueClient.ExistsAsync()) await queueClient.SendMessageAsync(data);
        }
    }
}