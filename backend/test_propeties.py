import pytest
import json
from application import app
from application.models.Property import Property

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

property_data = {
    "address": "125 Furtherwick Road",
    "bathrooms": '4',
    "bedrooms": '0',
    "council_tax_band": 'None',
    "created_on": "Thu, 15 Jun 2023 20:21:46 GMT",
    "description": "A local gym, located on Canvey Island",
    "energy_rating": 'None',
    "model_id": "jhbv43kjh34jh",
    "name": "Anytime Fitness Canvey Island",
    "owner_id": "6486fe5ad8920f8b400b20ef",
    "postcode": "SS8 7AT",
    "property_type": "Terraced",
    "rent_date": 'None',
    "rental_cost": 'None',
    "tenant_id": "648b1ecf800c2596b4c79aa1",
    "tenure": 'None'
  }
def test_property_class():
  assert hasattr(Property, 'create_property') and callable(getattr(Property, 'create_property'))
  assert hasattr(Property, 'get_all_properties') and callable(getattr(Property, 'get_all_properties'))
  assert hasattr(Property, 'get_properties_by_id') and callable(getattr(Property, 'get_properties_by_id'))
  assert hasattr(Property, 'get_properties_by_tenant') and callable(getattr(Property, 'get_properties_by_tenant'))

def test_property_fields():
  new_property = Property(**property_data)
  assert new_property.name
  assert new_property.description
  assert new_property.address
  assert new_property.bathrooms
  assert new_property.bedrooms
  assert new_property.council_tax_band
  assert new_property.created_on
  assert new_property.energy_rating
  assert new_property.model_id
  assert new_property.owner_id
  assert new_property.postcode
  assert new_property.property_type
  assert new_property.rent_date
  assert new_property.rental_cost
  assert new_property.tenant_id
  assert new_property.tenure

def test_create_property(client):
  new_property = Property(**property_data)
  create_property_response = new_property.create_property()
  assert 'error' in create_property_response
  # response = client.post('/properties', json.dumps(property_data), headers={'Content-Type': 'application/json'})
  # properties = response.get_json()
  # assert 'error' in properties
  # assert response.status == '415 UNSUPPORTED MEDIA TYPE'

def test_get_all_properties(client):
  response = client.get('/properties')
  properties = response.get_json()
  print(properties)
  assert len(properties) > 0
  assert response.status == '200 OK'

def test_get_properties_by_id(client):
  response = client.get('/properties/users/6486fe5ad8920f8b400b20ef')
  properties = response.get_json()
  assert len(properties) > 0
  assert response.status == '200 OK'

def test_get_properties_by_tenant(client):
  response = client.get('/properties/tenant/648b1ecf800c2596b4c79aa1')
  properties = response.get_json()
  assert len(properties) > 0
  assert response.status == '200 OK'

def test_get_properties_by_incorrect_id(client):
  response = client.get('properties/users/oejwopij3oipjmlokm')
  empty_array = response.get_json()
  assert response.status == '200 OK'
  assert len(empty_array) < 1



























  # response = properties.get_all_properties('648b1ecf800c2596b4c79aa1')
  # print(response)
  # res = app.get('/')
  # assert res.json == '<h1>Welcome to the PropertEase API </h1>'
  # mock_response = mock.Mock()
  # mock_response.json.return_value = {
  #   [
  #     {
  #       "_id": "6488402da06a7d332ef0a491",
  #       "address": "125 Furtherwick Road",
  #       "bathrooms": 4,
  #       "bedrooms": 0,
  #       "council_tax_band": "E",
  #       "created_on": "Tue, 13 Jun 2023 11:08:45 GMT",
  #       "description": "A small local gym located on Canvey Island",
  #       "energy_rating": "B",
  #       "model_id": null,
  #       "name": "Anytime Fitness Canvey Island",
  #       "owner_id": "6486fe5ad8920f8b400b20ef",
  #       "postcode": "SS8 7AT",
  #       "property_type": "Terraced",
  #       "rent_date": null,
  #       "rental_cost": 2000,
  #       "tenant_id": "6486fe5ad8920f8b400b20ef",
  #       "tenure": null
  #     }
  #   ]
  # }

  # mock_get = mock.Mock(return_value=mock_response)

  # requests.get = mock_get
  # Property.create_property()
  # mock.get.assert




    