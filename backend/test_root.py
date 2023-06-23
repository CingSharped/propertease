import pytest
from application import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_root_endpoint(client):
  response = client.get('/')
  result = response.get_json()
  print(response.data)
  assert response.status == '200 OK'
  assert str(response.data) == "b'<h1>Welcome to the PropertEase API </h1>'"