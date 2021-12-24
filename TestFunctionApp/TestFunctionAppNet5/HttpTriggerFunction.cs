using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace TestFunctionAppNet5
{
    public static class HttpTriggerFunction
    {
        [Function("HttpTriggerFunction")]
        public static HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]
            HttpRequestData req,
            FunctionContext executionContext)
        {
            var logger = executionContext.GetLogger("HttpTriggerFunction");
            logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            return response;
        }
    }
}