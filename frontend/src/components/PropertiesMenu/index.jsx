// import React, { useEffect, useState, createContext, useContext } from "react";
// import Modal from "../Modal";
// import NewRequestForm from "../NewRequestForm";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   Container
// } from "@mui/material";

// import { Box } from "@mui/system";
// import axios from 'axios';
// import CurrentElemIdContext from "../../context/CurrentElemIdContext";

// const PropertiesMenu = ({ properties, buttonText }) => {
//   const [elementId, setElementId] = useState();
//   const [isOpen, setIsOpen] = useState(false);
  
//   async function updateWorkOrderByLocationId(locationId) {
//     try {
//       // Step 1: Retrieve all work orders
//       const response = await axios.get('https://propertease-api.onrender.com/workorders');
  
//       // Step 2: Find the work order with the matching location_id
//       const workOrder = response.data.find(order => order.location_id === locationId);
  
//       if (!workOrder) {
//         console.log('No work order found with the provided location_id.');
//         return;
//       }
  
//       // Step 3: Extract work order's _id
//       const { _id } = workOrder;
//       console.log({ _id })
  
//       // Step 4: Create PATCH request URL
//       const patchUrl = `https://propertease-api.onrender.com/workorders/${_id}`;
  
//       // Step 5: Create PATCH request payload
//       const payload = {
//         completed: true
//       };
  
//       // Step 6: Send PATCH request
//       await axios.patch(patchUrl, payload);
  
//       console.log(`Work order ${_id} updated successfully.`);
//     } catch (error) {
//       console.error('An error occurred:', error.message);
//     }
//   }
  
//   const removeNullUndefinedKeys = (obj) => {
//     const newObj = { ...obj };
//     delete newObj.psets;
//     delete newObj.mats;
//     delete newObj.type;
//     return newObj;
//   };

//   //edited to remove null & undefined values
//   const createPropertyRow = (key, value) => {
//     if (value === null || value === undefined) {
//       return null;
//     } else if (value.value) {
//       value = value.value;
//     }
  
//     return (
//       <TableRow key={key}>
//         <TableCell>{key}</TableCell>
//         <TableCell>{value}</TableCell>
//       </TableRow>
//     );
//   };
  

//   const renderPropertyRows = (properties) => {
//     const filteredProperties = removeNullUndefinedKeys(properties);
//     return Object.entries(filteredProperties).map(([key, value]) =>
//       createPropertyRow(key, value)
//     );
//   };

//   const handleClick = () => {
//     for (let i = 0; i < Object.keys(properties).length; i++) {
//       if (Object.keys(properties)[i] === "expressID") {
//         const locationId = Object.values(properties)[i];
//         console.log("locationId from PropertiesMenu create work ordder", locationId);
//         setElementId(locationId);
//       }
//     }
//     setIsOpen(true);
//   };

//   //for Close work order button
//   const handleClick2 = () => {
//     for (let i = 0; i < Object.keys(properties).length; i++) {
//       if (Object.keys(properties)[i] === "location_id") {
//         const locationId = Object.values(properties)[i];
//         console.log("locationId close work order button", locationId);
//         setElementId(locationId);
//       }
//     }
    
//   };

//   useEffect(() => {}, [properties]);

//   const propertyRows = renderPropertyRows(properties);

//   return (
//     <>
//       <div></div>
//       <CurrentElemIdContext.Provider value={elementId}>
//         {isOpen && (
//           <Modal
//             children={<NewRequestForm value={elementId} />}
//             setIsOpen={setIsOpen}
//           />
//         )}
//       </CurrentElemIdContext.Provider>
//       <TableContainer
//         component={Paper}
//         sx={{
//           borderRadius: "10px",
//           boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
//           position: "absolute",
//           bottom: "0.5rem",
//           right: "0.5rem",
//           width: "30rem",
//         }}
//       >
//         <Box sx={{ mb: 2 }}>
//           <Table>
//             <TableBody>{propertyRows}</TableBody>
//           </Table>
//         </Box>
//         <div align="center">
//           <Box sx={{ mb: 2 }}>

//             <Button
//               variant="contained"
//               onClick={() => {
//                 if (buttonText == 'Create Work Order')
//                   handleClick();
//                 else
//                 if (buttonText == 'Close Work Order') 
//                 {
//                   console.log(elementId)
//                   updateWorkOrderByLocationId(elementId)

//                   alert("Work order closed")
//                     // Refresh the page afte2 seconds - this should be changed
                    
//                     // setTimeout(() => {
//                     //   window.location.reload();
//                     // }, 2000);
         

//                 }
//               }}
//               sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
//             >
//               {buttonText}
//             </Button>
//           </Box>

//           <Box sx={{ mb: 2 }}>

//           </Box>
//           {/* <Box  >
//             <Button variant="contained" onClick={() => {propertyMenuVisible=!propertyMenuVisible
//             console.log(propertyMenuVisible)}}>x</Button>
//           </Box> */}
//         </div>
//       </TableContainer>
//     </>
//   );
// };

// export default PropertiesMenu;


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
        console.log("locationId from PropertiesMenu create work order", locationId);
        setElementId(locationId);
      }
    }
    setIsOpen(true);
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
                  handleClick();
                else if (buttonText === 'Close Work Order') 
                {
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
