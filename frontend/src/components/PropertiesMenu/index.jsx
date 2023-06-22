import React, { useEffect, useState, createContext, useContext } from "react";
import Modal from "../Modal";
import NewRequestForm from "../NewRequestForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid
} from "@mui/material";
import CurrentElemIdContext from "../../context/CurrentElemIdContext";

import axios from 'axios';

//import { useNavigate } from "react-router-dom";
//import { useAuthContext } from '../../hooks/useAuthContext';

import { Box } from "@mui/system";
//import styles from "../Modal/Modal.module.css";

const PropertiesMenu = ({ properties }) => {
  const [elementId, setElementId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  //const { user } = useAuthContext();

  //const navigate = useNavigate();
  //console.log("properties from properties menu " , properties);

  //create a function to send the request to mark WO "completed": true
  //get all WOs, if elemId == location_id , change status to completed (patch? -> resend the data just changing "completed" = true)


  
  async function updateWorkOrderByLocationId(locationId) {
    try {
      // Step 1: Retrieve all work orders
      const response = await axios.get('https://propertease-api.onrender.com/workorders');
  
      // Step 2: Find the work order with the matching location_id
      const workOrder = response.data.find(order => order.location_id === locationId);
  
      if (!workOrder) {
        console.log('No work order found with the provided location_id.');
        return;
      }
  
      // Step 3: Extract work order's _id
      const { _id } = workOrder;
      console.log({ _id })
  
      // Step 4: Create PATCH request URL
      const patchUrl = `https://propertease-api.onrender.com/workorders/${_id}`;
  
      // Step 5: Create PATCH request payload
      const payload = {
        completed: true
      };
  
      // Step 6: Send PATCH request
      await axios.patch(patchUrl, payload);
  
      console.log(`Work order ${_id} updated successfully.`);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  

  //also buttons need to show based on status = completed...
  //and button to show only when WO button is clicked (i.e. when form is triggered by clicking on WO button)

  const removeNullUndefinedKeys = (obj) => {
    const newObj = { ...obj };
    delete newObj.psets;
    delete newObj.mats;
    delete newObj.type;
    return newObj;
  };

  //edited to remove null & undefined values
  const createPropertyRow = (key, value) => {
    if (value === null || value === undefined) {
      return null;
    } else if (value.value) {
      value = value.value;
    }
  
    return (
      <TableRow key={key}>
        <TableCell>{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  };
  

  const renderPropertyRows = (properties) => {
    const filteredProperties = removeNullUndefinedKeys(properties);
    return Object.entries(filteredProperties).map(([key, value]) =>
      createPropertyRow(key, value)
    );
  };

  const handleClick = () => {
    for (let i = 0; i < Object.keys(properties).length; i++) {
      if (Object.keys(properties)[i] === "expressID") {
        const locationId = Object.values(properties)[i];
        console.log("locationId from PropertiesMenu create work ordder", locationId);
        setElementId(locationId);
      }
    }
    setIsOpen(true);
  };

  //for Close work order button
  const handleClick2 = () => {
    for (let i = 0; i < Object.keys(properties).length; i++) {
      if (Object.keys(properties)[i] === "location_id") {
        const locationId = Object.values(properties)[i];
        console.log("locationId close work order button", locationId);
        setElementId(locationId);
      }
    }
    
  };

  useEffect(() => {}, [properties]);

  const propertyRows = renderPropertyRows(properties);

  return (
    <>
      <div></div>
      <CurrentElemIdContext.Provider value={elementId}>
        {isOpen && (
          <Modal
            children={<NewRequestForm value={elementId} />}
            setIsOpen={setIsOpen}
          />
        )}
      </CurrentElemIdContext.Provider>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          bottom: "0.5rem",
          right: "0.5rem",
          width: "30rem",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Table>
            <TableBody>{propertyRows}</TableBody>
          </Table>
        </Box>
        <div align="center">
          <Box sx={{ mb: 2 }}>
          <Grid item xs={10} style={{ display: "flex", gap: "1rem", align:"center" }}>
            <Button
              variant="contained"
              onClick={() => {
                handleClick();
              }}
              sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
            >
              Create work order
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                // console.log("go back to dashboard");
                // user.user_type ? navigate (`/${user.user_type}`) : "" 
                //send request to close
                handleClick2()
                console.log(elementId)
                updateWorkOrderByLocationId(elementId)
                //need the lcoation id here - elementId? / or locationId


              }}
              sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
            >
              Close work order
            </Button>
            </Grid>
          </Box>
          {/* <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                alert("Maintenance request closed")
              }}
              sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
            >
              Close Maintenance request
            </Button>
          </Box> */}
          <Box sx={{ mb: 2 }}>

          </Box>
          {/* <Box  >
            <Button variant="contained" onClick={() => {propertyMenuVisible=!propertyMenuVisible
            console.log(propertyMenuVisible)}}>x</Button>
          </Box> */}
        </div>
      </TableContainer>
    </>
  );
};

export default PropertiesMenu;
