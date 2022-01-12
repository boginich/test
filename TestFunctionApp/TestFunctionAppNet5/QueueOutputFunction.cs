using System.Net;
using System.Net.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.WebJobs;

namespace TestFunctionAppNet5
{
    public static class QueueOutputFunction
    {
        [Function("QueueOutputFunction")]
        public static HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]
            HttpRequestData req,
            FunctionContext executionContext
            /*[Queue("testqueue-items")] string testQueue*/)
        {
            //dynamic data = await req.Content.ReadAsAsync<object>();
            //return data?.name;
            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            return response;
        }
    }
}