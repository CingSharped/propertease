import React, { useState, useEffect } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext';

import "./style.css"

import MaintenanceRequestItem from "../MaintenanceRequestItem"



const MaintenanceRequestList = ({}) => {
  // const user = useAuthContext()
  const user = JSON.parse(localStorage.getItem("user"));
  let userId

  try {
    userId = user._id
  } catch (error) {
    console.log("no user id")
  }
  // const userId = user._id

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchRequests () {
    try {
      const res = await fetch(`https://propertease-api.onrender.com/workorders`)
  
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
