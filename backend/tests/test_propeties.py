import pytest
import requests

def test_get_all_properties(capsys):
  mock_response = mock.Mock()
  mock_response.json.return_value = {
    [
      {
        "_id": "6488402da06a7d332ef0a491",
        "address": "125 Furtherwick Road",
        "bathrooms": 4,
        "bedrooms": 0,
        "council_tax_band": null,
        "created_on": "Tue, 13 Jun 2023 11:08:45 GMT",
        "description": "A small local gym located on Canvey Island",
        "energy_rating": null,
        "model_id": null,
        "name": "Anytime Fitness Canvey Island",
        "owner_id": "6486fe5ad8920f8b400b20ef",
        "postcode": "SS8 7AT",
        "property_type": "Terraced",
        "rent_date": null,
        "rental_cost": null,
        "tenant_id": null,
        "tenure": null
      }
    ]
  }

  mock_get = mock.Mock(return_value=mock_response)

  requests.get = mock_get

    