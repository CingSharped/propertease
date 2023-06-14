from flask import Blueprint, request
import datetime
from application.controllers import workorders

workorder_routes = Blueprint('workorder_routes', __name__)


@workorder_routes.route('', methods=['POST'])
def create_workorder():
  request_data = request.get_json()
  title = request_data['title'] if 'title' in request_data else None
  description = request_data['description'] if 'description' in request_data else None
  work_type = request_data['work_type'] if 'work_type' in request_data else None
  location_id = request_data['location_id'] if 'location_id' in request_data else None
  cost = request_data['cost'] if 'cost' in request_data else None
  status = request_data['status'] if 'status' in request_data else None
  priority = request_data['priority'] if 'priority' in request_data else None
  property_id = request_data['priority'] if 'priority' in request_data else None
  created_on = datetime.datetime.now()
  created_by = request_data['created_by'] if 'created_by' in request_data else None

  if all(data is not None for data in (title, description, work_type, location_id, priority, property_id, created_by)):
    new_workorder = workorders.create_workorder(title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by)
    return new_workorder
  else:
    return { 'error': 'All required fields title, description, work_type, location_id, priority, property_id and created_by are required to create a workorder'}