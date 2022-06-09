using System;
using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace FunctionAppIsolated.HttpTriggerWithDependencyInjection;

public class HttpTriggerWithDependencyInjection
{
    private readonly ILogger<HttpTriggerWithDependencyInjection> _logger;
    private readonly IHttpResponderService _responderService;

    public HttpTriggerWithDependencyInjection(IHttpResponderService responderService,
        ILogger<HttpTriggerWithDependencyInjection> logger)
    {
        _responderService = responderService;
        _logger = logger;
    }

    [Function(nameof(HttpTriggerWithDependencyInjection))]
    public HttpResponseData Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequestData req)
    {
        _logger.LogInformation("message logged");
        return _responderService.ProcessRequest(req);
    }
}

public interface IHttpResponderService
{
    HttpResponseData ProcessRequest(HttpRequestData httpRequest);
}

public class DefaultHttpResponderService : IHttpResponderService
{
    public HttpResponseData ProcessRequest(HttpRequestData httpRequest)
    {
        var response = httpRequest.CreateResponse(HttpStatusCode.OK);

        response.Headers.Add("Date", DateTime.UtcNow.ToString("r"));
        response.Headers.Add("Content-Type", "text/html; charset=utf-8");
        response.WriteString("HttpTriggerWithDependencyInjection!");

        return response;
    }
}