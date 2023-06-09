import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';

import "./style.css"

import MaintenanceRequestItem from "../MaintenanceRequestItem"



const MaintenanceRequestList = ({data, isLoading}) => {
  const navigate = useNavigate()

  // const user = useAuthContext()
  const user = JSON.parse(localStorage.getItem("user"));
  let userId

  try {
    userId = user._id
  } catch (error) {
    console.log("no user id")
  }
  // const userId = user._id


  
  function deleteRequest(request){
    console.log(`delete`, request)
    //API CALL TO DELTE REQUEST
  }
  
  function completeRequest(request){
    console.log("complete", request)
    //API CALL TO MARK AS COMPLETE
  }

  function redirectPage(request){
    console.log("redirect", request)
    localStorage.setItem("property", JSON.stringify(request))
    navigate("/ifc")
  }
  

  return (
    <div className='maintenance-request-container'>
      <ul className='maintenance-request-list'>
       { isLoading === false 
        ? data.map((request, index) => 
        <MaintenanceRequestItem key={index} request={request} deleteRequest={deleteRequest} completeRequest={completeRequest} redirectPage={redirectPage}/>
        )
        :  <p>Loading...</p>}

      </ul>
    </div>
  )
}

export default MaintenanceRequestList
