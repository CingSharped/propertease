from flask import Blueprint, request
import datetime
from application.controllers import properties

property_routes = Blueprint('property_routes', __name__)


@property_routes.route('', methods=['POST'])
def create_property():
  request_data = request.get_json()
  name = request_data['name'] if 'name' in request_data else None
  owner_id = request_data['owner_id'] if 'owner_id' in request_data else None
  model_id = request_data['model_id'] if 'model_id' in request_data else None
  rent_date = request_data['rent_date'] if 'rent_date' in request_data else None
  tenant_id = request_data['tenant_id'] if 'tenant_id' in request_data else None
  rental_cost = request_data['rental_cost'] if 'rental_cost' in request_data else None
  bedrooms = request_data['bedrooms'] if 'bedrooms' in request_data else None
  bathrooms = request_data['bathrooms'] if 'bathrooms' in request_data else None
  tenure = request_data['tenure'] if 'tenure' in request_data else None
  property_type = request_data['property_type'] if 'property_type' in request_data else None
  description = request_data['description'] if 'description' in request_data else None
  council_tax_band = request_data['council_tax_band'] if 'council_tax_band' in request_data else None
  energy_rating = request_data['energy_rating'] if 'energy_rating' in request_data else None
  created_on = datetime.datetime.now()
  address = request_data['address'] if 'address' in request_data else None
  postcode = request_data['postcode'] if 'postcode' in request_data else None

  
  if all(data is not None for data in (name, owner_id, bedrooms, bathrooms, property_type, description, address, postcode)):
    return properties.create_property(name, owner_id, model_id, rent_date, tenant_id, rental_cost, bedrooms, bathrooms, tenure, property_type, description, council_tax_band, energy_rating, created_on, address, postcode) 
  else:
    return { 'error': 'All required fields name, owner_id, bedrooms, bathrooms, property_type, description are required to create property'}

@property_routes.route('', methods=['GET'])
def get_all_properties():
  return properties.get_all_properties()

@property_routes.route('/users/<_id>', methods=['GET'])
def get_properties_by_id(_id):
  return properties.get_properties_by_id(_id)

@property_routes.route('/tenant/<_id>', methods=['GET'])
def get_properties_by_tenant(_id):
  return properties.get_properties_by_tenant(_id)