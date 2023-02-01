import json
import boto3

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    response = table.update_item(
        Key={
            "id": event['id']
        },
        UpdateExpression="set myName = :newName", #name is a reserved keyword so have a column called 'myName'
        ExpressionAttributeValues={
            ':newName': event['myName']
        },
        ReturnValues="UPDATED_NEW"
    )
    return response
