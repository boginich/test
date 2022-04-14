using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

namespace TestFunctionAppNet6;

public class HttpTriggerFunctionOpenApi
{
    private readonly ILogger<HttpTriggerFunctionOpenApi> _logger;

    public HttpTriggerFunctionOpenApi(ILogger<HttpTriggerFunctionOpenApi> log)
    {
        _logger = log;
    }

    [FunctionName("HttpTriggerFunctionOpenApi")]
    [OpenApiOperation("Run", new[] {"name"})]
    [OpenApiParameter("name", In = ParameterLocation.Query, Required = true, Type = typeof(string),
        Description = "The **Name** parameter")]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "text/plain", typeof(string), Description = "The OK response")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        string name = req.Query["name"];

        var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);
        name ??= data?.name;

        var responseMessage = $"Hello, {name}. This HTTP triggered function executed successfully.";

        return new OkObjectResult(responseMessage);
    }
}