using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using static System.String;

namespace TestFunctionAppNet48
{
    public static class HttpTriggerFunction
    {
        [FunctionName("HttpTriggerFunction")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]
            HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");

            var name = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => Compare(q.Key, "name", StringComparison.OrdinalIgnoreCase) == 0)
                .Value;

            if (name != null)
                return req.CreateResponse(HttpStatusCode.OK, "Hello " + name);

            dynamic data = await req.Content.ReadAsAsync<object>();
            name = data?.name;

            return name == null
                ? req.CreateResponse(HttpStatusCode.BadRequest,
                    "Please pass a name on the query string or in the request body")
                : req.CreateResponse(HttpStatusCode.OK, "Hello " + name);
        }
    }
}