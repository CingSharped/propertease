from application.models.Property import Property

def create_property(name, owner_id, model_id, rent_date, tenant_username, rental_cost, bedrooms, bathrooms, tenure, property_type, description, council_tax_band, energy_rating, created_on, address, postcode):
  # check type options
  tenure_options = [None, 'Freehold', 'Leasehold', 'Commonhold']
  property_type_options = ['Detached', 'Semi Detached', 'Terraced', 'Flat', 'Bungalow', 'Land', 'Park Home']
  council_tax_options = [None, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  tenure_valid = tenure in tenure_options
  property_type_valid = property_type in property_type_options
  council_tax_band_valid = council_tax_band in council_tax_options
  # create instance of prop with data
  if all([tenure_valid, property_type_valid, council_tax_band_valid]):
    new_property = Property(name, owner_id, model_id, rent_date, tenant_username, rental_cost, bedrooms, bathrooms, tenure, property_type, description, council_tax_band, energy_rating, created_on, address, postcode)
    # run create_property and return it
    return new_property.create_property()
  else:
    return { 'error': 'Invalid option selected for tenure, property_type or council_tax_band'}

def get_all_properties():
  return Property.get_all_properties()

def get_properties_by_id(_id):
  return Property.get_properties_by_id(_id)