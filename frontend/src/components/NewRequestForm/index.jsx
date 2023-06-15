import React from 'react'
import { RiCloseLine } from "react-icons/ri"

import "./style.css";

const NewRequestForm = () => {




  return (
    
    <div className="new-request-form">
      <div className="container">
        <h3>New maintenance request</h3>
        * indicates required fields
        <form>
          <div className="form-row">
            <div className="input-data">
              <label htmlFor="work-type">Work type *</label>
              <select id='work-type' required>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="gas">Gas</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-data">
              <label htmlFor="priority">Priority *</label>
              <select id='priority' required>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <label htmlFor="work-location">Location *</label>
              <input required id="work-location" type="text" />
            </div>
            <div className="input-data">
              <label htmlFor="property-id">Property ID *</label>
              <input required id="property-id" type="text" />
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <label htmlFor="work-title">Title *</label>
              <input id="work-title" type="text" required />
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <label htmlFor="work-description">Description *</label>
              <textarea row={10} cols={50} type="text" id="work-description" required />
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <label htmlFor="cost">Cost £</label>
              <input id="cost" type="number" min="0.00" step="0.01" />
            </div>
          </div>

          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner">
                <input type="submit" value="submit" />
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>


  );
}

export default NewRequestForm
