using System;
using System.Net;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace FunctionAppIsolated.HttpTriggerWithBlobInput;

public static class HttpTriggerWithBlobInput
{
    [Function(nameof(HttpTriggerWithBlobInput))]
    public static MyOutputType Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequestData req,
        [BlobInput("test-samples/sample1.txt", Connection = "AzureWebJobsStorage")] string myBlob,
        FunctionContext context)
    {
        var bookVal = (Book) JsonSerializer.Deserialize(myBlob, typeof(Book));
        var response = req.CreateResponse(HttpStatusCode.OK);

        response.Headers.Add("Date", DateTime.Now.ToShortDateString());
        response.Headers.Add("Content-Type", "text/html; charset=utf-8");
        response.WriteString("HttpTriggerWithBlobInput!");

        return new MyOutputType
        {
            Book = bookVal,
            HttpResponse = response
        };
    }

    public class MyOutputType
    {
        [QueueOutput("functionstesting2", Connection = "AzureWebJobsStorage")]
        public Book Book { get; set; }

        public HttpResponseData HttpResponse { get; set; }
    }

    public class Book
    {
        public string name { get; set; }
        public string id { get; set; }
    }
}