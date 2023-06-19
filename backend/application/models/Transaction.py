from application import db

class Transaction:
  def __init__(self, property_id, property_owner_id, month, money, transaction_type, workorder_id, created_on):
    self.money = money
    self.month = month
    self.transaction_type = transaction_type
    self.property_id = property_id
    self.property_owner_id = property_owner_id
    self.workorder_id = workorder_id
    self.created_on = created_on


  def create_transaction(self):
    try:
      exists = db.transactions.find_one({ 'workorder_id': self.workorder_id })
      if exists:
        return { 'error': 'The transaction for this workorder already exists'}
      
      new_transaction = db.transactions.insert_one({
        'property_id': self.property_id,
        'property_owner_id': self.property_owner_id,
        'month': self.month,
        'money': self.money,
        'transaction_type': self.transaction_type,
        'workorder_id': self.workorder_id,
        'created_on': self.created_on
      })
      transaction_from_db = db.transactions.find_one({ 'workorder_id': self.workorder_id })
      if transaction_from_db:
        return {**transaction_from_db, '_id': str(transaction_from_db['_id'])}
      else:
        return { 'error': 'Error creating transaction'}
    except:
      return { 'error': 'Error connecting to mongodb' }
