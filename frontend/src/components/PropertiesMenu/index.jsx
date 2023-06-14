import React, { useEffect, useState } from "react";

const PropertiesMenu = ({ buildingId, properties }) => {
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
        const propertyValue = Object.values(properties)[i]
        //const propertyValue = properties[Object.keys(properties)[i]].value;
        alert(`Create maintenance request for building expressID: ${buildingId} \n element expressID: ${propertyValue}`)
        // console.log("building id from properties: " + buildingId)
        // console.log(propertyValue);
      }
    }
  };

  useEffect(() => {
  }, [properties]);

  const propertyEntries = renderPropertyEntries(properties);

  return (
    <>
      <button onClick={handleClick}>Create Maintenance request</button>
      <div id="ifc-property-menu-root">
        {propertyEntries}
      </div>
    </>
  );
};

export default PropertiesMenu;


// import React, {useEffect} from "react";

// const PropertiesMenu = ({ buildingId, properties } ) => { //buildingId is the expressId of the building
//   const removeNullUndefinedKeys = (obj) => {
//     const newObj = { ...obj };
//     delete newObj.psets;
//     delete newObj.mats;
//     delete newObj.type;
//     return newObj;
//   };

//   const removeAllChildren = (element) => {
//     while (element.firstChild) {
//       element.removeChild(element.firstChild);
//     }
//   };

//   const createPropertyEntry = (key, value) => {
//     const propContainer = document.createElement("div");
//     propContainer.classList.add("ifc-property-item");

//     if (value === null || value === undefined) value = "undefined";
//     else if (value.value) value = value.value;

//     const keyElement = document.createElement("div");
//     keyElement.textContent = key;
//     propContainer.appendChild(keyElement);

//     const valueElement = document.createElement("div");
//     valueElement.classList.add("ifc-property-value");
//     valueElement.textContent = value;
//     propContainer.appendChild(valueElement);

//     return propContainer;
//   };

//   const createPropertiesMenu = (properties) => {
//     const propsGUI = document.getElementById("ifc-property-menu-root");
//     removeAllChildren(propsGUI);

//     const filteredProperties = removeNullUndefinedKeys(properties);

//     for (let key in filteredProperties) {
//       const propEntry = createPropertyEntry(key, filteredProperties[key]);
//       propsGUI.appendChild(propEntry);
//     }
//   };

//   const handleClick = () => {
//     for (let i = 0; i < Object.keys(properties).length; i++) {

//       // console.log(Object.keys(properties)[i], Object.values(properties)[i])
//       if (Object.keys(properties)[i] == "expressID") {
//         const propertyValue = Object.values(properties)[i]
//         //const propertyValue = properties[Object.keys(properties)[i]].value;
//         alert(`Create maintenance request for building expressID: ${buildingId} \n element expressID: ${propertyValue}`)
//         // console.log("building id from properties: " + buildingId)
//         // console.log(propertyValue);
//       }
//     }
//   };

//   useEffect(() => {
//     createPropertiesMenu(properties);
//   }, [properties]);

//   return (
//     <>
//       <button onClick={handleClick}>Create Maintenance request</button>
//       <div id="ifc-property-menu-root"></div>
//     </>
//   );
// };

// export default PropertiesMenu;



