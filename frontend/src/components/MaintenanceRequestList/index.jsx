import React from 'react'
import "./style.css"

import MaintenanceRequestItem from "../MaintenanceRequestItem"

const MaintenanceRequestList = ({ maintenanceRequest }) => {
  function deleteRequest(request){
    console.log(`delete`, request)
    //API CALL TO DELTE REQUEST
  }

  function completeRequest(request){
    console.log("complete", request)
    //API CALL TO MARK AS COMPLETE
  }

  return (
    <div className='maintenance-request-container'>
      <ul className='maintenance-request-list'>
        {maintenanceRequest.map((request, index) => 
          <MaintenanceRequestItem key={index} request={request} deleteRequest={deleteRequest} completeRequest={completeRequest} />
        )}
      </ul>
    </div>
  )
}

export default MaintenanceRequestList
