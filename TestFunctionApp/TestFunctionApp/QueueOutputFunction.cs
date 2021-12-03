using System.Collections;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace TestFunctionAppNet48
{
    public static class QueueOutputFunction
    {
        [FunctionName("QueueOutputFunction")]
        [return: Queue("testqueue-items")]
        public static async Task<string> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequestMessage req,
            //[Queue("testqueue-items")] string testQueue, 
            TraceWriter log)
        {
            log.Info("C# QueueOutputFunction processed a request.");
            dynamic data = await req.Content.ReadAsAsync<object>();
            return data?.name;
        }
    }
}