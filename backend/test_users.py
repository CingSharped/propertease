import pytest
import json
from application import app
from application.models.User import User
from application.controllers import users

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

user_data_without_token = {
  "username": "Chris",
  "password": "jkl",
  "user_type": "Landlord"
}

user_data_for_login = {
  "username": "chris",
  "password": "jkl"
}

def test_user_controller():


def test_user_fields():
  new_user = User(**user_data_without_token)
  assert new_user.username
  assert new_user.password
  assert new_user.user_type

def test_login(client):
  login_user_response = User.login_user(**user_data_for_login)
  user = login_user_response.get_json()
  print(login_user_response)
  assert login_user_response.username
  assert login_user_response._id
  assert login_user_response.user_type
  assert login_user_response.token

def test_signup():
  new_user = User(**user_data_without_token)
  create_user_response = new_user.create_user()
  assert 'error' in create_user_response
  assert create_user_response == { 'error': 'Username already exists' }