from application import db
from application.models.Workorder import Workorder

def create_workorder(_id, title, description, work_type, location_id, cost, status, priority, property_id, property_owner_id, created_on, created_by, completed):
  new_workorder = Workorder(_id, title, description, work_type, location_id, cost, status, priority, property_id, property_owner_id, created_on, created_by, completed)
  return new_workorder.create_workorder()

def get_all_workorders():
  return Workorder.get_all_workorders()

def get_workorders_by_property(_id):
  return Workorder.get_workorders_by_property(_id)

def get_workorders_by_user(_id):
  return Workorder.get_workorders_by_user(_id)

def update_workorder( _id, title, description, work_type, location_id, cost, status, priority, property_id, property_owner_id, created_on, created_by, completed):
  print(f'in controllers: {_id}')
  workorder = Workorder( _id, title, description, work_type, location_id, cost, status, priority, property_id, property_owner_id, created_on, created_by, completed)
  print(f'New workorder: {workorder._id}')
  return workorder.update_workorder()