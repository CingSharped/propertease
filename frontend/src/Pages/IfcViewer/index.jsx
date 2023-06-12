import React, { useRef, useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import * as THREE from "three";
import './IfcViewer.css';

const IfcViewer = ({ ifcProject }) => {
  const containerRef = useRef();
  const propsGUIRef = useRef();

  useEffect(() => {
    const ifcUrl = "../ifc-models/TESTED_Simple_project_01.ifc";
    const container = containerRef.current;
    const viewer = new IfcViewerAPI({
      container,
      backgroundColor: new THREE.Color(0xffffff),
    });

    viewer.axes.setAxes();
    viewer.grid.setGrid();

    const handleDoubleClick = async () => {
      const result = await viewer.IFC.selector.highlightIfcItem();
      if (!result) return;
      const { modelID, id } = result;
      const props = await viewer.IFC.getProperties(modelID, id, true, false);
      console.log(props);
      createPropertiesMenu(props);
    };

    const handleMouseMove = () => viewer.IFC.selector.prePickIfcItem();

    const handleKeyDown = (event) => {
      if (event.code === "KeyP") {
        viewer.clipper.createPlane();
      } else if (event.code === "KeyO") {
        viewer.clipper.deletePlane();
      }
    };

    const loadIfc = async (url) => {
      const model = await viewer.IFC.loadIfcUrl(url);

      console.log("URL:" + url);

      const ifcProject = await viewer.IFC.getSpatialStructure(model.modelID);

      console.log(ifcProject);
    };

    const createPropertiesMenu = (properties) => {
      console.log(properties);

      removeAllChildren(propsGUIRef.current);

      delete properties.psets;
      delete properties.mats;
      delete properties.type;

      for (let key in properties) {
        createPropertyEntry(key, properties[key]);
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

      propsGUIRef.current.appendChild(propContainer);
    };

    const removeAllChildren = (element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    };

    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    viewer.clipper.active = true;

    loadIfc(ifcUrl);

    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      viewer.dispose();
    };
  }, []);

  return (
    <>
      <div id="viewer-container" ref={containerRef} />
      <div className="ifc-property-menu">
        <div className="ifc-property-item">
          <div>Key</div>
          <div className="ifc-property-value">Value</div>
        </div>
        <div id="ifc-property-menu-root" ref={propsGUIRef}></div>
      </div>
    </>
  );
};

export default IfcViewer;
