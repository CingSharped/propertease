import React from "react";

const PropertiesMenu = ({ properties }) => {
  const removeNullUndefinedKeys = (obj) => {
    const newObj = { ...obj };
    delete newObj.psets;
    delete newObj.mats;
    delete newObj.type;
    return newObj;
  };

  const removeAllChildren = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  const createPropertyEntry = (key, value) => {
    const propContainer = document.createElement("div");
    propContainer.classList.add("ifc-property-item");

    if (value === null || value === undefined) value = "undefined";
    else if (value.value) value = value.value;

    const keyElement = document.createElement("div");
    keyElement.textContent = key;
    propContainer.appendChild(keyElement);

    const valueElement = document.createElement("div");
    valueElement.classList.add("ifc-property-value");
    valueElement.textContent = value;
    propContainer.appendChild(valueElement);

    return propContainer;
  };

  const createPropertiesMenu = (properties) => {
    const propsGUI = document.getElementById("ifc-property-menu-root");
    removeAllChildren(propsGUI);

    const filteredProperties = removeNullUndefinedKeys(properties);

    for (let key in filteredProperties) {
      const propEntry = createPropertyEntry(key, filteredProperties[key]);
      propsGUI.appendChild(propEntry);
    }
  };

  React.useEffect(() => {
    createPropertiesMenu(properties);
  }, [properties]);

  return <div id="ifc-property-menu-root"></div>;
};

export default PropertiesMenu;
