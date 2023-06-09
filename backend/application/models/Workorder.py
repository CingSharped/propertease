from application import db
from bson.objectid import ObjectId

class Workorder:
  def __init__(self, _id, title, description, work_type, location_id, cost, status, priority, property_id, property_owner_id, created_on, created_by, completed):
    self._id = _id
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
    self.property_owner_id = property_owner_id # required
    self.completed = completed
        
  def create_workorder(self):
    try:
      exists_in_db = db.workorders.find_one({'title': self.title, 'property_id': self.property_id, 'location_id': self.location_id})
      if exists_in_db:
        return { 'error': f'Workorder "{self.title}" for this property already exists'}
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
        'created_by': self.created_by,
        'property_owner_id': self.property_owner_id,
        'completed': self.completed
      })
      new_workorder = db.workorders.find_one({'title': self.title, 'property_id': self.property_id, 'location_id': self.location_id})
      if new_workorder:
        return { **new_workorder, '_id': str(new_workorder['_id']) }
      else:
        return { 'error': 'Error creating new workorder' }
    except:
      return { 'error': 'Error connecting to mongodb' }

  def get_all_workorders():
    try:
      workorders = []
      db_workorders = db.workorders.find({})
      for property in db_workorders:
          property['_id'] = str(property['_id'])
          workorders.append(property)
      return workorders
    except:
      return { 'error': 'Error connecting to mongodb' }

  def get_workorders_by_property(_id):
    try:
      workorders = []
      db_workorders = db.workorders.find({ 'property_id': _id })
      for property in db_workorders:
          property['_id'] = str(property['_id'])
          workorders.append(property)
      return workorders
    except:
      return { 'error': 'Error connecting to mongodb' }

  def get_workorders_by_user(_id):
    try:
      workorders = []
      db_workorders = db.workorders.find({ 'property_owner_id': _id })
      for property in db_workorders:
          property['_id'] = str(property['_id'])
          workorders.append(property)
      return workorders
    except:
      return { 'error': 'Error connecting to mongodb' }

  def update_workorder(self):
    try:
      exists_in_db = db.workorders.find_one({'_id': ObjectId(self._id)})

      db.workorders.update_one({'_id': ObjectId(self._id)}, {'$set': {
          'title': self.title,
          'description': self.description,
          'work_type': self.work_type,
          'location_id': self.location_id,
          'cost': self.cost,
          'status': self.status,
          'priority': self.priority,
          'property_id': self.property_id,
          'created_on': self.created_on,
          'created_by': self.created_by,
          'property_owner_id': self.property_owner_id,
          'completed': self.completed
      }})
      # Retrieve the updated workorder
      updated_workorder = db.workorders.find_one({'_id': ObjectId(self._id)})
      print(updated_workorder)
      if updated_workorder:
          return {**updated_workorder, '_id': str(updated_workorder['_id'])}
      else:
          return {'error': 'Error updating workorder'}
    except:
      return {'error': 'Error connecting to MongoDB'}