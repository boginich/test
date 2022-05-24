using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace FunctionAppIsolated.HttpTriggerWithMultipleOutputBindings;

public static class HttpTriggerWithMultipleOutputBindings
{
    [Function(nameof(HttpTriggerWithMultipleOutputBindings))]
    public static MyOutputType Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequestData req,
        FunctionContext context)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);
        response.WriteString("HttpTriggerWithMultipleOutputBindings!");
        
        return new MyOutputType
        {
            Name = "some name",
            HttpResponse = response
        };
    }
}

public class MyOutputType
{
    [QueueOutput("functionstesting2", Connection = "AzureWebJobsStorage")]
    public string Name { get; set; }

    public HttpResponseData HttpResponse { get; set; }
}