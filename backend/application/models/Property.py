from application import db

class Property:
  def __init__(self, name, owner_id, model_id, rent_date, tenant_id, rental_cost, bedrooms, bathrooms, tenure, property_type, description, council_tax_band, energy_rating, created_on, address_id)
  self.name = name # required
  self.owner_id = owner_id # required
  self.model_id = model_id or None
  self.rent_date = rent_date or None
  self.tenant_id = tenant_id or None
  self.rental_cost = rental_cost or None
  self.bedrooms = bedrooms # required
  self.bathrooms = bathrooms # required
  self.tenure = tenure or None
  self.property_type = property_type # required
  self.description = description # required
  self.council_tax_band = council_tax_band or None
  self.energy_rating - energy_rating or None
  self.created_on = created_on or None
  self.address_id = address_id or None


  def create_property(self):
    new_property = db.properties.insert_one({
      'name': self.name,
      'description': self.description
      'owner_id': self.owner_id
      'model_id': self.model_id
      'rent_date': self.rent_date
      'tenant_id': self.tenant_id,
      'rental_cost': self.rental_cost,
      'bedrooms': self.bedrooms,
      'bathrooms': self.bathrooms,
      'tenure': self.tenure,
      'property_type': self.property_type,
      'description': self.description,
      'council_tax_band': self.council_tax_band,
      'energy_rating': self.energy_rating,
      'created_on': self.created_on,
      'address_id': self.address_id
    })
    property_from_db = db.properties.find_one({'_id': new_property.inserted_id})
    if property_from_db:
      return {'success': f'New property {self.name} added to the database'}
    else:
      return {'error': 'Error adding property to the database'}