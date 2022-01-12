using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace TestFunctionAppNet5
{
    public static class QueueTriggerFunction
    {
        [Function("QueueTriggerFunction")]
        public static void Run([QueueTrigger("myqueue-items", Connection = "")]
            string myQueueItem,
            FunctionContext context)
        {
            var logger = context.GetLogger("QueueTriggerFunction");
            logger.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
        }
    }
}