using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace TestFunctionAppNet6;

public class QueueTriggerFunction
{
    [FunctionName("QueueTriggerFunction")]
    public void Run([QueueTrigger("testqueue", Connection = "")] string myQueueItem, ILogger log)
    {
        log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
    }
}