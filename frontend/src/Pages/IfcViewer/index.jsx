import React, { useRef, useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import * as THREE from "three";
import './IfcViewer.css'

const IfcViewer = ({ ifcProject }) => {
  const containerRef = useRef();

  useEffect(() => {
    const ifcUrl = "../ifc-models/TESTED_Simple_project_01.ifc";
    const container = containerRef.current;
    const viewer = new IfcViewerAPI({
      container,
      backgroundColor: new THREE.Color(0xffffff),
    });

    viewer.axes.setAxes();
    viewer.grid.setGrid();

    //window.ondblclick = () => viewer.IFC.selector.pickIfcItem(true); //then get the properties etc

    window.ondblclick = async () => {
      const result = await viewer.IFC.selector.highlightIfcItem();
      if (!result) return;
      const { modelID, id } = result;
      const props = await viewer.IFC.getProperties(modelID, id, true, false);
      console.log(props);
      createPropertiesMenu(props)
    };

    const propsGUI = document.getElementById("ifc-property-menu-root");

    function createPropertiesMenu(properties) {
      console.log(properties);

      removeAllChildren(propsGUI);

      delete properties.psets;
      delete properties.mats;
      delete properties.type;

      for (let key in properties) {
        createPropertyEntry(key, properties[key]);
      }
    }

    function createPropertyEntry(key, value) {
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

      propsGUI.appendChild(propContainer);
    }

    function removeAllChildren(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }

    window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();

    //create clipping planes
    viewer.clipper.active = true;
    window.onkeydown = (event) => {
      if (event.code === "KeyP") {
        viewer.clipper.createPlane();
      } else if (event.code === "KeyO") {
        viewer.clipper.deletePlane();
      }
    };

    async function loadIfc(url) {
      // Load the model
      const model = await viewer.IFC.loadIfcUrl(url);

      console.log("URL:" + url);

      // Add dropped shadow and post-processing efect - not working properly - scaling issue

      //   await viewer.shadowDropper.renderShadow(model.modelID);
      //   viewer.context.renderer.postProduction.active = true;

      // model.removeFromParent(); //enable/disable categories filter

      const ifcProject = await viewer.IFC.getSpatialStructure(model.modelID);

      console.log(ifcProject);
    }

    loadIfc(ifcUrl);

    return () => {
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
        <div id="ifc-property-menu-root"></div>
      </div>
    </>
  );
};

export default IfcViewer;
