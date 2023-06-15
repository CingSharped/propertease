from application import db
from application.models.Workorder import Workorder

def create_workorder(title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by):
  new_workorder = Workorder(title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by)
  return new_workorder.create_workorder()

def get_all_workorders():
  return Workorder.get_all_workorders()