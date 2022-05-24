using System;
using Microsoft.Azure.Functions.Worker;

namespace FunctionApp
{
    public static class QueueTrigger
    {
        [Function(nameof(QueueTrigger))]
        public static Book Run([QueueTrigger("functionstesting2", Connection = "AzureWebJobsStorage")] Book myQueueItem,
            [BlobInput("test-samples/sample1.txt", Connection = "AzureWebJobsStorage")] string myBlob)
        {
            Console.WriteLine(myBlob);
            return myQueueItem;
        }
    }

    public class Book
    {
        public string name { get; set; }
        public string id { get; set; }
    }

}
