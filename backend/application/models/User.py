from application import db

class User:
    def __init__(self, username, password, user_type):
      self.username = username
      self.password = password
      self.user_type = user_type
        
    def create_user(self):
      db.users.insert_one({'username': self.username, 'password': self.password, 'user_type': self.user_type})
      new_user = db.users.find_one({ 'username': self.username })
      if new_user:
        return {'_id': str(new_user['_id']), 'username': new_user['username'], 'user_type': new_user['user_type']}
      else:
        return {'error': 'User could not be created'}