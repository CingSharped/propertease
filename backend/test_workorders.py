import pytest
import json
from application import app
from application.models.Workorder import Workorder

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

workorder_data =   {
    "_id": "648b18d0ac763b34c9c4eaac",
    "cost": 2000,
    "created_by": "6486fe5ad8920f8b400b20ef",
    "created_on": "Thu, 15 Jun 2023 13:57:36 GMT",
    "description": "The taps in the kitchen has been dripping for the past day",
    "location_id": "aeafvndoavbadv",
    "priority": "High",
    "property_id": "High",
    "status": 'false',
    "title": "Leaking tap",
    "property_owner_id": "6486fe5ad8920f8b400b20ef",
    "work_type": "Repair",
    "completed": "false"
  }

def test_workorder_feilds():
  new_workorder = Workorder(**workorder_data)
  assert new_workorder._id
  assert new_workorder.cost
  assert new_workorder.created_by
  assert new_workorder.created_on
  assert new_workorder.description
  assert new_workorder.location_id
  assert new_workorder.priority
  assert new_workorder.property_id
  assert new_workorder.status
  assert new_workorder.title
  assert new_workorder.work_type
  assert new_workorder.property_owner_id
  assert new_workorder.completed

def test_create_workorder():
  new_workorder = Workorder(**workorder_data)
  create_workorder_response = new_workorder.create_workorder()
  assert 'error' in create_workorder_response

def test_get_all_properties(client):
  response = client.get('/workorders')
  workorders = response.get_json()
  assert len(workorders) > 0
  assert response.status == '200 OK'

def test_get_workorder_by_property(client):
  response = client.get('/workorders/properties/648b64ca2431694eaff1d1dc')
  workorders = response.get_json()
  assert len(workorders) > 0
  assert response.status == '200 OK'

def test_get_workorder_by_user(client):
  response = client.get('/workorders/users/648b1ecf800c2596b4c79aa1')
  workorders = response.get_json()
  assert len(workorders) > 0
  assert response.status == '200 OK'