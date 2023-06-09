from application import db

class User:
    def __init__(self, username, password, type):
        self.username = username
        self.password = password
        self.type = type

    def create_user(self):
      try:
        db.users.insert_one({'username': self.username, 'password': self.password})
      except:
         return 'User could not be created'