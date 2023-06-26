# PropertEase

This is a fullstack property management app with IFC/BIM integration using IFC.js. The app is built using React and allows Landlords, Tenants and Service Workers to view and manage properties, including opening and closing maintenance requests associated to speficic building elements, directly from the IFC model viewer. User and property (i.e. building) details are stored in a MongoDB database. Created to [this brief](https://gist.github.com/msgilling/53f4954b9818eace10d88c0b09854501#deliverables).  

## Features

- Landlord, Tenant and Service worker dashboards
- Information about properties: profit and expense tracking for landlords, oustanding workorders, EPC rating, etc.
- IFC model viewer integrated with maintenance database: create and track the status of maintenance workorders linked to specific building elements

## Contributors

[Christopher Sharpe](https://github.com/CingSharped)

[João Patacas](https://github.com/jpatacas)

[Thanushiyan Poobalasingam](https://github.com/nngw)

[Francesca Adu](https://github.com/FrancescaAdu)

[Leah Thomas](https://github.com/Leahjthom)

[Mustafa Hassan](https://github.com/mustafah1)

## Installation and usage

1. Open a terminal and navigate to the directory you wish to store the project in.

2. Clone the repo using the below command

```
git clone git@github.com:CingSharped/propertease.git
```

3. Navigate into the `frontend/` folder using the below command

```
cd propertease && cd frontend/
```

4. Install the required packages using the below command

```
npm install
```

5. The code for the frontend uses a deployed version of the API, however the server may be idle, visit the [api](https://propertease-api.onrender.com/) to wake it up

6. In your terminal in the `frontend/` folder, start the frontend with the below command

```
npm run dev
```

Click the [link](http://localhost:5173/) on the terminal to access the website

## API Endpoints

### User endpoints

| Method | Endpoint        | Purpose         | Body                        | Return Data Format       |
| ------ | --------------- | --------------- | --------------------------- | ------------------------ |
| POST   | /users/signup   | sign up a user  | `{ username, password, user_type }` | User info and token    `{ _id, username, user_type, token }`   |
| POST   | /users/login    | login a user    | `{ username, password }`    | User info and token    `{ _id, username, user_type, token }`  |
|        |                 |                 |  |                          |

### Property endpoints





| Method | Endpoint                            | Purpose                                     | Body                                          | Return Data Format            |
| ------ | ----------------------------------- | ------------------------------------------- | --------------------------------------------- | ----------------------------- |
| POST   | /properties                         | create a new property                       | `{ name, description, owner_id, model_id, rent_date, tenant_id, rental_cost, bedrooms, bathrooms, tenure, property_type, council_tax_band, energy_rating, postcode, address }` | New Property       `{ _id, name, description, owner_id, model_id, rent_date, tenant_id, rental_cost, bedrooms, bathrooms, tenure, property_type, council_tax_band, energy_rating, address, postcode }`            |
| GET    | /properties                         | get all properties                          | Array of properties                            | `[ property, property, property ]` |
| GET    | /properties/users/<_id>             | get all properties associated with the users _id | Array of properties                       | `[ property, property, property ]` |


### Workorder endpoints


| Method | Endpoint                       | Purpose                                           | Body                                                                                                                                                                                                                                                                                                                             | Return Data Format            |
| ------ | ------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| GET    | /workorders                    | get all workorders                                |                                                                                                                                                                                | Array of all workorders `[workorder,workorder,workorder,]`
| POST   | /workorders                    | create a new workorder                            | `{ title, description, work_type, location_id, cost, status, priority, property_id, created_by, property_owner_id }`                                                                                                                                          | New workorder     `{ _id, title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by, property_owner_id, completed }`             |                                                                                                                                                                         |
| GET    | /workorders/users/<_id>        | gets all workorders where property_owner_id matches _id |                                                                                                                                | Array of workorders `[workorder, workorder, workorder,]`                                                   
| GET    | /workorders/properties/<_id>   | gets all workorders where property_id matches _id |                                                                                                                                                                                   | Array of workorders `[workorder, workorder, workorder,]`
| PATCH  | /work | updates a workorder in the database | `{_id,title, description,  work_type, location_id, cost, status,priority, property_id, created_on, created_by, property_owner_id, completed }` | Updated workorder `{_id,title, description, work_type, location_id, cost, status, priority, property_id, created_on, created_by, property_owner_id, completed }`


### Transaction endpoints


| Method | Endpoint                          | Purpose                                                 | Body                                                                                                                                         | Return Data Format          |
| ------ | --------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| POST   | /transactions                     | create a new transaction                                | `{ month, money, property_id, property_owner_id, transaction_type, workorder_id }`                                                           | New transaction       `{ _id, month, money, property_id, property_owner_id, transaction_type, workorder_id }`       |
| GET    | /transactions/users/<_id>         | returns all transactions where _id matches property_owner_id |                                             | Array of transactions<br>`{`<br>`transaction,`<br>`transaction,`<br>`transaction`<br>`}`       
| GET    | /transactions/properties/<_id>    | returns all transactions where _id matches property_id    |                                                 | Array of transactions<br>`{`<br>`transaction,`<br>`transaction,`<br>`transaction`<br>`}`   


## Technologies

### Frontend

- IFC.js
- React
- Chart.js
- MUI
- axios
- vitest
- jest

### Backend

- Flask
- python
- MongoDB
- gunicorn
- JWT
- bcrypt
- pytest


## Known bugs

- Issue in the implementation of useState in the IFC viewer, maintenance data does not always load 
