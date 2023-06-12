import bcrypt
import os
import jwt
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
    # create token
    token = jwt.encode({'_id': str(new_user['_id']), 'username': new_user['username']}, str(os.getenv('SECRET')), algorithm='HS256')
    # return user _id, username, type and a token
    return {**new_user, 'token': token}
    

def login(username, password):
    # get user with user.username and check against user.password
    user = db.users.find_one({ 'username': username })
    if not user:
        return { 'error': 'User does not exist, please sign up before trying to log in'}
    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({'_id': str(user['_id']), 'username': user['username']}, str(os.getenv('SECRET')), algorithm='HS256')
        return {'_id': str(user['_id']), 'username': user['username'], 'user_type': user['user_type'], 'token': token}
    else:
        return { 'error': 'Incorrect credentials'}