import React, { useState } from 'react'

import "./style.css";

const NewRequestForm = () => {
  const [workType, setWorkType] = useState()
  const [priority, setPriority] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [cost, setCost] = useState(null)
  const [location, setLocation] = useState()
  const [propertyID, setPropertyID] = useState()

  async function handleSubmit (e) {
    e.preventDefault()

    const request = {
      "cost": cost,
      "created_by": "USER",
      "description": description,
      "priority": priority,
      "status": false,
      "title": title,
      "work_type": workType,
      "location_id": "set by IFC",
      "property_id": "set by IFC"
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

      setTitle("")
      setDescription("")
      setCost(0)
      setPriority("")
      setWorkType("")
    }
  }
  
  return (
    <div className="new-request-form">
      <div className="container">
        <h3>New maintenance request</h3>
        <p> * indicates required fields</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <label htmlFor="work-title">Title *</label>
              <input id="work-title" type="text" onChange={e => setTitle(e.target.value)} value={title} required/>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <label htmlFor="work-description">Description *</label>
              <textarea required row={10} cols={50} type="text" id="work-description" onChange={e => setDescription(e.target.value)} value={description}/>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <label htmlFor="cost">Cost £</label>
              <input id="cost" type="number" min="0.00" step="0.01" onChange={e => setCost(e.target.value)} value={cost}/>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <label htmlFor="work-type">Work type *</label>
              <select id='work-type' required onChange={e => setWorkType(e.target.value)}>
                <option value=""></option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="gas">Gas</option>
                <option value="repairs">Repair</option>
                <option value="improvements">Improvements</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-data">
              <label htmlFor="priority">Priority *</label>
              <select id='priority' required onChange={e => setPriority(e.target.value)}>
                <option value=""></option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner">
                <input type="submit" value="Submit" />
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>


  );
}

export default NewRequestForm
