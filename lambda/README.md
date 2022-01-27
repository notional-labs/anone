# Metrics Handler

## SQS Queue Config
Queue should be normal.  We do not care about order.
Naming convention
`${ENVIRONMENT}-Analytics`

The final name of the Queue created in the AWS dashboard should be kept and saved in lambda environment config

## Lambda config
Handler function in AWS console should be set to **dist/lambda.handler**

**Runtime:** node 12.x+

## Lambda build
Do the following:
* `npm install`
* `npm run package`
* Upload the created `lambda.zip` in the AWS lambda console.

### Env variables:
SQS_QUEUE_URL should be set to the URL of the created metrics queue.

## Putting items on the Queue.
Look at the code in /routes/Metric.ts.  This is an example of putting a message in the SQS Queue to be processed by the Metric handler.

You can run `npm start` and this will launch a webserver.  

## Environment Variables:
