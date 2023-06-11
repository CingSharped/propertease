from flask import Blueprint, request
from application.controllers import users

user_routes = Blueprint('user_routes', __name__)


@user_routes.route('/')
def users_welcome_page():
  return '<p>This is the users page</p>'

@user_routes.route('/signup', methods=['POST'])
def signup_user():
  request_data = request.get_json()
  username = None
  password = None
  user_type = None
  if 'username' in request_data and 'password' in request_data and 'user_type' in request_data:
    username = str(request_data['username'].lower())
    password = str(request_data['password'])
    user_type = request_data['user_type']
    new_user = users.signup(username, password, user_type)
    return new_user
  else:  
    return {'error': 'All fields required'}
  
@user_routes.route('/login', methods=['POST'])
def login_user():
  request_data = request.get_json()
  username = None
  password = None
  if 'username' in request_data and 'password' in request_data:
    username = str(request_data['username'].lower())
    password = str(request_data['password'])
    logged_in_user = users.login(username, password)
    return logged_in_user
  else:  
    return {'error': 'All fields required'}