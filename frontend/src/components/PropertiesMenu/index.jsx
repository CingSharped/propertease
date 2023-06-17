import React, { useEffect, useState, createContext, useContext } from "react";
import Modal from "../Modal";
import NewRequestForm from "../NewRequestForm";
//import BuildingIdContext from "../../context/BuildingIdContext";
import CurrentElemIdContext from "../../context/CurrentElemIdContext";

const PropertiesMenu = ({ properties }) => {
  const [elementId, setElementId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  // const buildingId = useContext(BuildingIdContext);
  // const elemId = useContext(CurrentElemIdContext);

  const removeNullUndefinedKeys = (obj) => {
    const newObj = { ...obj };
    delete newObj.psets;
    delete newObj.mats;
    delete newObj.type;
    return newObj;
  };

  const createPropertyEntry = (key, value) => {
    if (value === null || value === undefined) value = "undefined";
    else if (value.value) value = value.value;

    return (
      <div className="ifc-property-item" key={key}>
        <div>{key}</div>
        <div className="ifc-property-value">{value}</div>
      </div>
    );
  };

  const renderPropertyEntries = (properties) => {
    const filteredProperties = removeNullUndefinedKeys(properties);
    return Object.entries(filteredProperties).map(([key, value]) =>
      createPropertyEntry(key, value)
    );
  };

  const handleClick = () => {
    for (let i = 0; i < Object.keys(properties).length; i++) {
      // console.log(Object.keys(properties)[i], Object.values(properties)[i])
      if (Object.keys(properties)[i] == "expressID") {
        const locationId = Object.values(properties)[i];
        //const propertyValue = properties[Object.keys(properties)[i]].value;
        ///alert(`Create maintenance request for building expressID: ${buildingId} \n element expressID: ${locationId}`)
        console.log("locationId from Properties mEnu", locationId);
        setElementId(locationId);
        // return locationId
        // console.log("building id from properties: " + buildingId)
        // console.log(locationId);

        //bring form to create workorder
      }
    }
  };

  useEffect(() => {}, [properties]);

  const propertyEntries = renderPropertyEntries(properties);

  return (
    <>
      <button
        onClick={() => {
          handleClick();
          setIsOpen(true);
        }}
      >
        Create Maintenance request
      </button>
      <CurrentElemIdContext.Provider value={elementId}>
        {isOpen && (
          <Modal children={<NewRequestForm value={elementId}/>} setIsOpen={setIsOpen} />
        )}
        <div id="ifc-property-menu-root">{propertyEntries}</div>
      </CurrentElemIdContext.Provider>
    </>
  );
};

export default PropertiesMenu;
