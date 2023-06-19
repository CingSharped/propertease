from application.models.Transaction import Transaction

def create_transaction(property_id, property_owner_id, month, money, transaction_type, workorder_id, created_on):
  # check type options
  month_options = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  transaction_type_options = ['Income', 'Expense']
  month_valid = month in month_options
  transaction_type_valid = transaction_type in transaction_type_options

  if all([month_valid, transaction_type_valid]):
    new_transaction = Transaction(property_id, property_owner_id, month, money, transaction_type, workorder_id, created_on)
    return new_transaction.create_transaction()
  else:
    return { 'error': 'Invalid option selected for month or transaction_type' }