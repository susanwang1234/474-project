import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    db=boto3.resource('dynamodb')
    request_table = db.Table('SFU-Swap-Users')
    

    if event['http_method'] == 'GET':
        all_items = request_table.scan()
        return (all_items['Items'])
