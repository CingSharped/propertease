from application import db

class User:
    def __init__(self, username, password, user_type):
      self.username = username
      self.password = password
      self.user_type = user_type
        
    def create_user(self):
      try:
        # check username doesn't exist in database
        exists_in_db = db.users.find_one({ 'username': self.username})
        if exists_in_db:
          return { 'error': 'Username already exists'}
        db.users.insert_one({'username': self.username, 'password': self.password, 'user_type': self.user_type})
        new_user = db.users.find_one({ 'username': self.username })
        if new_user:
          return {'_id': str(new_user['_id']), 'username': new_user['username'], 'user_type': new_user['user_type']}
        else:
          return {'error': 'Error created user'}
      except:
        return { 'error': 'Error connecting to mongodb'}

    def login_user(username, password):
      try:
        user = db.users.find_one({ 'username': username })
        if not user:
          return { 'error': 'User does not exist, please sign up before trying to log in'}
        return {**user, '_id': str(user['_id'])}
      except:
        return { 'error': 'Error connecting to mongodb'}