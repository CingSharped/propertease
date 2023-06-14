
from application import db
from application.models.Property import Property

def create_property(name, owner_id, model_id, rent_date, tenant_username, rental_cost, bedrooms, bathrooms, tenure, property_type, description, council_tax_band, energy_rating, created_on, address, postcode):
  # check types
  exists_in_db = db.properties.find_one({'name': name, 'owner_id': owner_id})
  if exists_in_db:
    return { 'error': f'You already have a propery named "{name}" already exists'}
  tenure_options = [None, 'Freehold', 'Leasehold', 'Commonhold']
  property_type_options = ['Detached', 'Semi Detached', 'Terraced', 'Flat', 'Bungalow', 'Land', 'Park Home']
  council_tax_options = [None, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  tenure_valid = tenure in tenure_options
  property_type_valid = property_type in property_type_options
  council_tax_band_valid = council_tax_band in council_tax_options
  # create instance of prop with data
  if all([tenure_valid, property_type_valid, council_tax_band_valid]):
    new_property = Property(name, owner_id, model_id, rent_date, tenant_username, rental_cost, bedrooms, bathrooms, tenure, property_type, description, council_tax_band, energy_rating, created_on, address, postcode)
    # run create_property
    property_from_db = new_property.create_property()
    return property_from_db
  else:
    return { 'error': 'Invalid option selected for tenure, property_type or council_tax_band'}

def get_all_properties():
  properties = Property.get_all_properties()
  return properties