import React, { useContext, useState } from 'react'
import BuildingIdContext from '../../context/BuildingIdContext';
import CurrentElemIdContext from '../../context/CurrentElemIdContext';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';


import "./style.css";

const NewRequestForm = () => {
  const [workType, setWorkType] = useState()
  const [priority, setPriority] = useState()
  const [location, setLocation] = useState()
  //const [propertyID, setPropertyID] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [cost, setCost] = useState(null)
  const [status, setStatus] = useState (false)

  //setLocation(elemId)
  const buildingId = useContext(BuildingIdContext)
  const elemId = useContext(CurrentElemIdContext)

  console.log("buiilding id: " + buildingId)
  console.log("elemId from NewRequestForm: " + elemId)
  //setPropertyID(buildingId)

//data for database

  // {
  //   "_id": "648b18d0ac763b34c9c4eaac",
  //   "cost": 2000,
  //   "created_by": "6486fe5ad8920f8b400b20ef",
  //   "created_on": "Thu, 15 Jun 2023 13:57:36 GMT",
  //   "description": "The taps in the kitchen has been dripping for the past day",
  //   "location_id": "aeafvndoavbadv",
  //   "priority": "High",
  //   "property_id": "High",
  //   "status": false,
  //   "title": "Leaking tap",
  //   "work_type": "Repair"
  // }

  async function handleSubmit (e) {
    e.preventDefault()

    const request = {
      "cost": cost,
      "created_by": "USER",
      "description": description,
      "location_id": elemId,
      "priority": priority,
      "property_id": buildingId,
      "status": false,
      "title": title,
      "work_type": workType
    }

    const res = await fetch("https://propertease-api.onrender.com/workorders", {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )

    const json = await res.json()
    
    console.log(json)
    if (res.ok) {
      console.log("new request added", json) 

    setCost(0)
    setDescription("")
    setLocation("")
    setPriority("")
    setTitle("")
    setPriority("")
    setWorkType("")
    }
  }
  
  return (
    <div className="new-request-form">
      <Container>
        <Typography variant="h3">New maintenance request</Typography>
        <Typography variant="body1">* indicates required fields</Typography>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <FormControl>
                <InputLabel htmlFor="work-type">Work type *</InputLabel>
                <Select
                  id="work-type"
                  value={workType}
                  onChange={e => setWorkType(e.target.value)}
                  required
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="electrical">Electrical</MenuItem>
                  <MenuItem value="plumbing">Plumbing</MenuItem>
                  <MenuItem value="gas">Gas</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="input-data">
              <FormControl>
                <InputLabel htmlFor="priority">Priority *</InputLabel>
                <Select
                  id="priority"
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  required
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
  
          <div className="form-row">
            <div className="input-data">
              <TextField
                id="work-location"
                label="Location *"
                value={elemId}
                onChange={e => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="input-data">
              <TextField
                id="property-id"
                label="Property ID *"
                value={buildingId}
                onChange={e => setBuildingId(e.target.value)}
                required
              />
            </div>
          </div>
  
          <div className="form-row">
            <div className="input-data">
              <TextField
                id="work-title"
                label="Title *"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
  
          <div className="form-row">
            <div className="input-data">
              <TextField
                id="work-description"
                label="Description *"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                required
              />
            </div>
          </div>
  
          <div className="form-row">
            <div className="input-data">
              <TextField
                id="cost"
                label="Cost £"
                type="number"
                min="0.00"
                step="0.01"
                value={cost}
                onChange={e => setCost(e.target.value)}
              />
            </div>
          </div>
  
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
  
}

export default NewRequestForm


// import React, { useContext, useState } from 'react'
// import BuildingIdContext from '../../context/BuildingIdContext';
// import CurrentElemIdContext from '../../context/CurrentElemIdContext';

// import "./style.css";

// const NewRequestForm = () => {
//   const [workType, setWorkType] = useState()
//   const [priority, setPriority] = useState()
//   const [location, setLocation] = useState()
//   //const [propertyID, setPropertyID] = useState()
//   const [title, setTitle] = useState()
//   const [description, setDescription] = useState()
//   const [cost, setCost] = useState(null)
//   const [status, setStatus] = useState (false)

//   //setLocation(elemId)
//   const buildingId = useContext(BuildingIdContext)
//   const elemId = useContext(CurrentElemIdContext)

//   console.log("buiilding id: " + buildingId)
//   console.log("elemId from NewRequestForm: " + elemId)
//   //setPropertyID(buildingId)

// //data for database

//   // {
//   //   "_id": "648b18d0ac763b34c9c4eaac",
//   //   "cost": 2000,
//   //   "created_by": "6486fe5ad8920f8b400b20ef",
//   //   "created_on": "Thu, 15 Jun 2023 13:57:36 GMT",
//   //   "description": "The taps in the kitchen has been dripping for the past day",
//   //   "location_id": "aeafvndoavbadv",
//   //   "priority": "High",
//   //   "property_id": "High",
//   //   "status": false,
//   //   "title": "Leaking tap",
//   //   "work_type": "Repair"
//   // }

//   async function handleSubmit (e) {
//     e.preventDefault()

//     const request = {
//       "cost": cost,
//       "created_by": "USER",
//       "description": description,
//       "location_id": elemId,
//       "priority": priority,
//       "property_id": buildingId,
//       "status": false,
//       "title": title,
//       "work_type": workType
//     }

//     const res = await fetch("https://propertease-api.onrender.com/workorders", {
//       method: 'POST',
//       body: JSON.stringify(request),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     )

//     const json = await res.json()
    
//     console.log(json)
//     if (res.ok) {
//       console.log("new request added", json) 

//     setCost(0)
//     setDescription("")
//     setLocation("")
//     setPriority("")
//     setTitle("")
//     setPriority("")
//     setWorkType("")
//     }
//   }
  
//   return (
//     <div className="new-request-form">
//       <div className="container">
//         <h3>New maintenance request</h3>
//         <p> * indicates required fields</p>
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="input-data">
//               <label htmlFor="work-type">Work type *</label>
//               <select id='work-type' required onChange={e => setWorkType(e.target.value)}>
//                 <option value=""></option>
//                 <option value="electrical">Electrical</option>
//                 <option value="plumbing">Plumbing</option>
//                 <option value="gas">Gas</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="input-data">
//               <label htmlFor="priority">Priority *</label>
//               <select id='priority' required onChange={e => setPriority(e.target.value)}>
//                 <option value=""></option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="input-data">
//               <label htmlFor="work-location">Location *</label>
//               <input id="work-location" type="text" onChange={e => setLocation(e.target.value)} value={elemId} required/>
//             </div>
//             <div className="input-data">
//               <label htmlFor="property-id">Property ID *</label>
//               <input  id="property-id" type="text" onChange={e => setPropertyID(e.target.value)} value={buildingId} required/>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="input-data">
//               <label htmlFor="work-title">Title *</label>
//               <input id="work-title" type="text" onChange={e => setTitle(e.target.value)} value={title} required/>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="input-data">
//               <label htmlFor="work-description">Description *</label>
//               <textarea required row={10} cols={50} type="text" id="work-description" onChange={e => setDescription(e.target.value)} value={description}/>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="input-data">
//               <label htmlFor="cost">Cost £</label>
//               <input id="cost" type="number" min="0.00" step="0.01" onChange={e => setCost(e.target.value)} value={cost}/>
//             </div>
//           </div>

//           <div className="form-row submit-btn">
//             <div className="input-data">
//               <div className="inner">
//                 <input type="submit" value="submit" />
//               </div>
//             </div>
//           </div>

//         </form>
//       </div>
//     </div>


//   );
// }

// export default NewRequestForm
