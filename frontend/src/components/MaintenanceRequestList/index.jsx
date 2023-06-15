import React, { useState, useEffect } from 'react'
import "./style.css"

import MaintenanceRequestItem from "../MaintenanceRequestItem"

const MaintenanceRequestList = ({}) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchRequests () {
    try {
      const res = await fetch("https://propertease-api.onrender.com/workorders")
  
      const json = await res.json()
      
      setData(json)
      
      data.length === 0
      ? setIsLoading(false) 
      : ""
      
    } catch (error) {
      console.log("error loading data")
    }

  }
  
  useEffect(() => {
    fetchRequests()
  },[])
  
  function deleteRequest(request){
    console.log(`delete`, request)
    //API CALL TO DELTE REQUEST
  }
  
  function completeRequest(request){
    console.log("complete", request)
    //API CALL TO MARK AS COMPLETE
  }
  
  
  // console.log(data)
  return (
    <div className='maintenance-request-container'>
      <ul className='maintenance-request-list'>
       { isLoading === false 
        ? data.map((request, index) => 
        <MaintenanceRequestItem key={index} request={request} deleteRequest={deleteRequest} completeRequest={completeRequest} />
        )
        :  <p>Loading...</p>}

      </ul>
    </div>
  )
}

export default MaintenanceRequestList
