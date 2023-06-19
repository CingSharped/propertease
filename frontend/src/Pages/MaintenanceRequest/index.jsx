import React, { useState, useEffect } from 'react'

import "./style.css"
import styles from "../../components/Modal/Modal.module.css";
import { MaintenanceRequestList } from '../../components'
import { NewRequestForm } from '../../components';
import { Modal } from '../../components'


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

          {<MaintenanceRequestList />}
        </div>

        <div className="column" id="right">
          <button 
            className={styles.primaryBtn} 
            onClick={() => setIsOpen(true)}>
            New Request form
          </button>
          {isOpen && <Modal children={<NewRequestForm setIsOpen={setIsOpen}/>} setIsOpen={setIsOpen} />}
            
        </div>
      </div>
        

    </div>
  )

    



}

export default MaintenanceRequest
