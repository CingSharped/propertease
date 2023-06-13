import React from 'react'

import MaintenanceRequestItem from "../MaintenanceRequestItem"

const MaintenanceRequestList = ({ maintenanceRequest }) => {

  return (
    <div className='maintenance-request-container'>
      <ul className='maintenance-request-list'>
        {maintenanceRequest.map((request, index) => 
          <MaintenanceRequestItem key={index} request={request} />
        )}
      </ul>
    </div>
  )
}

export default MaintenanceRequestList
