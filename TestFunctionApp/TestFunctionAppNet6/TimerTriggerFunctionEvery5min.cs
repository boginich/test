using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace TestFunctionAppNet6
{
    public class TimerTriggerFunctionEvery5min
    {
        [FunctionName("TimerTriggerFunctionEvery5min")]
        public void Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
        }
    }
}
