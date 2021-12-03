using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;


namespace TestFunctionAppNet48
{
    public static class QueueTriggerFunction
    {
        [FunctionName("QueueTriggerFunction")]
        public static void Run(
            [QueueTrigger("testqueue-items", Connection = "")]string testQueueItem, TraceWriter log)
        {
            log.Info($"C# Queue trigger function processed: {testQueueItem}");
        }
    }
}
