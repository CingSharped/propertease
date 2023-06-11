import bcrypt
import os
from application import db
from application.models.User import User


def signup(username, password, user_type):
    # check username doesn't exist in database
    exists_in_db = db.users.find_one({ 'username': username})
    if exists_in_db:
        return { 'error': 'Username already exists'}
    # hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(int(os.getenv('SALT'))))
    # create user
    user = User(username, hashed_password, user_type)
    new_user = user.create_user()
    print(new_user)
    # return username, type and token
    return new_user
    

def login(user):
    # get user with user.username and check against user.password
    # return username, type and token
    return 'this features has not been implemented'