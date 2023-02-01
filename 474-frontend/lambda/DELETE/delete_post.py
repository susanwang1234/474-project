import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Posting')

def lambda_handler(event, context):
    response = table.delete_item(Key={'id': event["id"]})
    return response
