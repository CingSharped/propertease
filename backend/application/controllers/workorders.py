from application import db
from application.models.Workorder import Workorder

def create_workorder(title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by):
  exists_in_db = db.workorders.find_one({'title': title, 'property_id': property_id, 'location_id': location_id})
  if exists_in_db:
    return { 'error': f'Workorder {title} for this property already exists'}
  
  new_workorder = Workorder(title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by)
  workorder_from_db = new_workorder.create_workorder()
  return workorder_from_db