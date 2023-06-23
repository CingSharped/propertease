import pytest
import json
from application import app
from application.models.Transaction import Transaction

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

transaction_data = {
    "created_on": "Mon, 19 Jun 2023 16:16:39 GMT",
    "money": "1600",
    "month": "January",
    "property_id": "648b64ca2431694eaff1d1dc",
    "property_owner_id": "648b1ecf800c2596b4c79aa1",
    "transaction_type": "Income",
    "workorder_id": "943nby403m97"
  }

def test_transaction_fields():
  new_transaction = Transaction(**transaction_data)
  assert new_transaction.money
  assert new_transaction.created_on
  assert new_transaction.month
  assert new_transaction.property_id
  assert new_transaction.property_owner_id
  assert new_transaction.transaction_type
  assert new_transaction.workorder_id

def test_create_transaction():
  new_transaction = Transaction(**transaction_data)
  create_transaction_response = new_transaction.create_transaction()
  assert 'error' in create_transaction_response

def test_get_transactions_by_user(client):
  response = client.get('/transactions/users/648b1ecf800c2596b4c79aa1')
  transactions = response.get_json()
  assert len(transactions) > 0
  assert response.status == '200 OK'

def test_get_transactions_by_property(client):
  response = client.get('/transactions/properties/648b64ca2431694eaff1d1dc')
  transactions = response.get_json()
  assert len(transactions) > 0
  assert response.status == '200 OK'