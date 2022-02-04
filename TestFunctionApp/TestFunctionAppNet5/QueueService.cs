using System.Threading.Tasks;
using Azure.Storage.Queues;

namespace TestFunctionAppNet5
{
    public class QueueService
    {
        private const string QueueName = "testqueue";

        private const string connectionString =
            "DefaultEndpointsProtocol=https;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=https://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=https://127.0.0.1:10001/devstoreaccount1;";

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