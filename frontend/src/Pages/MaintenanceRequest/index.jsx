import React from 'react'

import "./style.css"
import MaintenanceRequestList from '../../components/MaintenanceRequestList'

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


  return (
    <div className='maintenance-request'>
      <h1>Maintenance Requests</h1>

      <div className="row">

          <div className="column" id="left">
            {<MaintenanceRequestList maintenanceRequest={mr_example} />}
          </div>



          <div className="column" id="right" style={{backgroundColor: 'Gray'}}>Add form button</div>
        </div>
    </div>
  )
}

export default MaintenanceRequest
