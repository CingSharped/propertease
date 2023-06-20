from flask import Blueprint, request
import datetime
from application.controllers import transactions

transaction_routes = Blueprint('transaction_routes', __name__)

@transaction_routes.route('', methods=['POST'])
def create_transaction():
  request_data = request.get_json()
  money = request_data['money'] if 'money' in request_data else None
  month = request_data['month'] if 'month' in request_data else None
  transaction_type = request_data['transaction_type'] if 'transaction_type' in request_data else None
  property_id = request_data['property_id'] if 'property_id' in request_data else None
  property_owner_id = request_data['property_owner_id'] if 'property_owner_id' in request_data else None
  workorder_id = request_data['workorder_id'] if 'workorder_id' in request_data else None
  created_on = datetime.datetime.now()

  if all(data is not None for data in (property_id, property_owner_id, month, money, transaction_type, workorder_id, created_on)):
    return transactions.create_transaction(property_id, property_owner_id, month, money, transaction_type, workorder_id, created_on)
  else:
    return {'error': 'All required fields property_id, month, money, transaction_type and property_owner_id are required'}

@transaction_routes.route('/properties/<_id>', methods=['GET'])
def get_transactions_by_property(_id):
  return transactions.get_transactions_by_property(_id)

@transaction_routes.route('/users/<_id>', methods=['GET'])
def get_transactions_by_user(_id):
  return transactions.get_transactions_by_user(_id)