import React, { useState } from 'react'

import "./style.css"
import styles from "../../components/NewRequestForm/Modal.module.css";
import MaintenanceRequestList from '../../components/MaintenanceRequestList'
import NewRequestForm from '../../components/NewRequestForm'


const MaintenanceRequest = () => {

  // TO BE REMOVED ONCE CONNECTED TO FRONT END
  const mr_example = [
  {"issue":"Leaking tap",
  "location": "42 Panda Road",
  "description": "bathroom tap leaking",
  "completed": false},
  {"issue":"hot water not working",
  "location": "42 Panda land",
  "description": "no hot water in kitchen",
  "completed": true}
]

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='maintenance-request'>
      <h2>Maintenance Requests</h2>

      <div className="row">

        <div className="column" id="left">
          {<MaintenanceRequestList maintenanceRequest={mr_example} />}
        </div>

        <div className="column" id="right">
          <button 
            className={styles.primaryBtn} 
            onClick={() => setIsOpen(true)}>
            Open Modal
          </button>
          {isOpen && <NewRequestForm setIsOpen={setIsOpen} />}
            
        </div>
      </div>
        

    </div>
  )

    



}

export default MaintenanceRequest
