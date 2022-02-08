using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace TestFunctionAppNet5
{
    public static class HttpTriggerFunction
    {
        [Function("HttpTriggerFunction")]
        public static async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]
            HttpRequestData req,
            FunctionContext executionContext)
        {
            var name = executionContext.BindingContext.BindingData["Name"]?.ToString();

            //var query = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
            //var name = query["Name"];

            var queueService = new QueueService();
            await queueService.QueueDataAsync(name);

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
            await response.WriteStringAsync($"{name}, welcome to Azure Functions!");
            return response;
        }
    }
}