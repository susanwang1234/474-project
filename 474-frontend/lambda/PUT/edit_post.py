import json
import boto3

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table('Posting')

def lambda_handler(event, context):
    response = table.update_item(
        Key={
            "id": event['id']
        },
        UpdateExpression="set title = :newTitle, price = :newPrice, myType = :newType", #owner and type are reserved keywords, so I cannot use that for my expression, use newType instead of type instead
        ExpressionAttributeValues={
            ':newTitle': event['title'],
            ':newPrice': event['price'],
            ':newType' : event['myType']
        },
        ReturnValues="UPDATED_NEW"
    )
    return response
