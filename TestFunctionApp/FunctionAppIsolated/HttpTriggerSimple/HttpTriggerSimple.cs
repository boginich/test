using System;
using System.Diagnostics;
using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace FunctionAppIsolated.HttpTriggerSimple;

public static class HttpTriggerSimple
{
    [Function(nameof(HttpTriggerSimple))]
    public static HttpResponseData Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
        HttpRequestData req,
        FunctionContext executionContext)
    {
        var sw = new Stopwatch();
        sw.Restart();

        var logger = executionContext.GetLogger("FunctionApp.HttpTriggerSimple");
        logger.LogInformation("Message logged");

        var response = req.CreateResponse(HttpStatusCode.OK);
        response.Headers.Add("Date", DateTime.UtcNow.ToString("r"));
        response.Headers.Add("Content-Type", "text/html; charset=utf-8");
        response.WriteString("HttpTriggerSimple!");

        logger.LogInformation("funcExecutionTimeMs {0}", sw.Elapsed.TotalMilliseconds);

        return response;
    }
}