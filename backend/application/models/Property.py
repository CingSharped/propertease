from application import db

class Property:
  def __init__(self, name, owner_id, model_id, rent_date, tenant_id, rental_cost, bedrooms, bathrooms, tenure, property_type, description, council_tax_band, energy_rating, created_on, address, postcode):
    self.name = name # required
    self.owner_id = owner_id # required
    self.model_id = model_id
    self.rent_date = rent_date
    self.tenant_id = tenant_id
    self.rental_cost = rental_cost
    self.bedrooms = bedrooms # required
    self.bathrooms = bathrooms # required
    self.tenure = tenure
    self.property_type = property_type # required
    self.description = description # required
    self.council_tax_band = council_tax_band
    self.energy_rating = energy_rating
    self.created_on = created_on
    self.address = address
    self.postcode = postcode


  def create_property(self):
    new_property = db.properties.insert_one({
      'name': self.name,
      'description': self.description,
      'owner_id': self.owner_id,
      'model_id': self.model_id,
      'rent_date': self.rent_date,
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
      'address': self.address,
      'postcode': self.postcode
    })
    print(str(new_property.inserted_id))
    property_from_db = db.properties.find_one({'name': self.name, 'owner_id': self.owner_id})
    print(property_from_db)
    if property_from_db:
      return {**property_from_db, '_id': str(property_from_db['_id']) }
    else:
      return {'error': 'Error adding property to the database'}


  def get_all_properties():
    properties = []
    db_properties = db.properties.find({})
    for property in db_properties:
        property['_id'] = str(property['_id'])
        properties.append(property)
    return properties