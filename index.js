const AWS = require ('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});


exports.handler = async (event, context, callback) => {
    
    const requestId = context.requestId;
    
    
  if(event.name && event.email && event.message) {
      
        //  promise fulfilled or rejected 
        await createMessage(requestId, event).then(() => {
            callback(null, {
                statusCode: 201,
                body: '',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
        }).catch((err) => {
            console.error(err)
        })
    } else {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }
    
    
    
};


function createMessage(requestId, event) {
    
    const params = {
        TableName: 'Message',
        Item: {
            "messageId":  event.messageId ,
            'name' : event.name,
            'email' : event.email,
            'message' : event.message
        }
    }
    return docClient.put(params).promise();
}
