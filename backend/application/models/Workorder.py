from application import db

class Workorder:
  def __init__(self, title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by):
    self.title = title # required
    self.description = description # required
    self.work_type = work_type # required
    self.location_id = location_id # required
    self.cost = cost
    self.status = status
    self.priority = priority # required
    self.property_id = property_id # required
    self.created_on = created_on
    self.created_by = created_by # required
        
  def create_workorder(self):
    workorder = db.workorders.insert_one({
      'title': self.title,
      'description': self.description,
      'work_type': self.work_type,
      'location_id': self.location_id,
      'cost': self.cost,
      'status': self.status,
      'priority': self.priority,
      'property_id': self.property_id,
      'created_on': self.created_on,
      'created_by': self.created_by
    })
    new_workorder = db.workorders.find_one({'title': self.title, 'property_id': self.property_id, 'location_id': self.location_id})
    if new_workorder:
      return { **new_workorder, '_id': str(new_workorder['_id']) }
    else:
      return { 'error': 'Error creating new workorder' }