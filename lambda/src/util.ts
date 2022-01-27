import AWS from "aws-sdk";

export async function deleteMessage(sqs: AWS.SQS,queueURL: string, message: AWS.SQS.Types.Message) {
    return new Promise((resolve, reject) => {
        const deleteParams: any = {
            QueueUrl: queueURL,
        };
        // Have to do this because AWS lowercases the param name and types are wrong.  WTF.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        deleteParams.ReceiptHandle = message.ReceiptHandle || message.receiptHandle
        console.log(message);
        sqs.deleteMessage(deleteParams, function (err, data) {
            if (err) {
                console.log(`Delete Error with queue: ${queueURL}`, err);
                reject(err);
                return;
            } else {
                console.log("Message Deleted", data);
                resolve(data);
                return;
            }
            reject("Cannot delete");
            return;
        });
    })
}