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
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { Box } from "@mui/system";
import axios from 'axios';
import CurrentElemIdContext from "../../context/CurrentElemIdContext";

const PropertiesMenu = ({ properties, buttonText }) => {
  const [elementId, setElementId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for controlling the dialog visibility
  
  async function updateWorkOrderByLocationId(locationId) {
    try {

      const response = await axios.get('https://propertease-api.onrender.com/workorders');
  
      console.log(locationId)
      const workOrder = response.data.find(order => order.location_id === locationId);
  
      if (!workOrder) {
        console.log('No work order found with the provided location_id.');
        return;
      }
  
  //extract WO id - fine until here
      const { _id } = workOrder;
      console.log({ _id })
  
      const patchUrl = `https://propertease-api.onrender.com/workorders/${_id}`;
  
      // PATCH request payload
      const payload = {
        completed: true
      };
  
      //get CORS error here
      await axios.patch(patchUrl, payload);
  
      console.log(`Work order ${_id} updated successfully.`);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  
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

  const handleClickCreateWOButton = () => {
    for (let i = 0; i < Object.keys(properties).length; i++) {
      if (Object.keys(properties)[i] === "expressID") {
        const locationId = Object.values(properties)[i];
        console.log("locationId from PropertiesMenu create work order", locationId);
        setElementId(locationId);
      }
    }
    setIsOpen(true);
  };

  const handleClickCloseWOButton = () => {
    for (let i = 0; i < Object.keys(properties).length; i++) {
      if (Object.keys(properties)[i] === "location_id") {
        const locationId = Object.values(properties)[i];
        console.log("locationId from PropertiesMenu create work order", locationId);
        setElementId(locationId);
      }
    }

  };

  //for Close work order button

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
            <Button
              variant="contained"
              onClick={() => {
                if (buttonText === 'Create Work Order')
                handleClickCreateWOButton();
                else if (buttonText === 'Close Work Order') 
                {
                  handleClickCloseWOButton()
                  console.log(elementId);
                  updateWorkOrderByLocationId(elementId);
                  setDialogOpen(true); // Open the dialog when closing the work order
                }
              }}
              sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
            >
              {buttonText}
            </Button>
          </Box>
        </div>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}> {/* Dialog component */}
        <DialogTitle>Work Order Closed</DialogTitle>
        {/* <DialogContent>
          <TextField
            label="Work order closed" // Change the label as per your requirement
            fullWidth
            disabled
          />
        </DialogContent> */}
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PropertiesMenu;
