import React, { useRef, useEffect, useState, useContext, createContext } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import * as THREE from "three";
import PropertiesMenu from "../../components/PropertiesMenu";
import "./IfcViewer.css";
import BuildingIdContext from "../../context/BuildingIdContext";
import { Button } from "@mui/material";

const IfcViewer = ({ ifcProject }) => {
  const containerRef = useRef();
  const [selectedProperties, setSelectedProperties] = useState({});
  const [isPropertyMenuVisible, setPropertyMenuVisible] = useState(false);
  const [buildingId, setBuildingId] = useState(); //store the expressId of a building 
  const [loadingIfc, setLoadingIfc] = useState(true);

  useEffect(() => {
    //const ifcUrl = "../ifc-models/TESTED_Simple_project_01.ifc"
    const ifcUrl = "../ifc-models/rac_basic_sample_project-IFC4-2.ifc";

    const viewer = new IfcViewerAPI({
      container: containerRef.current,
      backgroundColor: new THREE.Color(0xffffff),
    });

    const handleDoubleClick = async () => {
      const result = await viewer.IFC.selector.pickIfcItem(true);
      if (!result) return;

      const { modelID, id } = result;
      //id = expressId

      const props = await viewer.IFC.getProperties(modelID, id, true, false);

      console.log(props);
      setSelectedProperties(props);
      if (!isPropertyMenuVisible) {
        togglePropertyMenu();
      }
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
      //await viewer.IFC.setWasmPath("../../../");
      const model = await viewer.IFC.loadIfcUrl(url);

      // Setup camera controls, i.e. change initial view
      const controls = viewer.context.ifcCamera.cameraControls;

      controls.setPosition(-45.6, 6.3, 25.8, false); // X - red / Y - green (up) / Z - blue
      //controls.setTarget(-7.1, 10, 2.5, false);

      //renders shadow for model
      await viewer.shadowDropper.renderShadow(model.modelID);

      //post processing below causing the properties to not load on first click
      //  viewer.context.renderer.postProduction.active = true;

      //for tree menu, and to get building id
      ifcProject = await viewer.IFC.getSpatialStructure(model.modelID);
      //console.log(ifcProject.expressID);

      setBuildingId(ifcProject.expressID);

      //here assign useContext variable
      
      console.log("loaded ifc");
      
      setLoadingIfc(false);

    };

    viewer.axes.setAxes();
    viewer.grid.setGrid();
    viewer.clipper.active = true;

    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    loadIfc(ifcUrl);

    document.getElementById('express_209236')
.addEventListener('click', () => {
    viewer.IFC.selector.pickIfcItemsByID(0, [209236, 1306
    ], true);
})

    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      viewer.dispose();
    };
  }, []);

  const togglePropertyMenu = () => {
    setPropertyMenuVisible(!isPropertyMenuVisible);
  };

  return (
    <>
    {/* <div>Building id: {buildingId}</div> */}
    <Button variant="contained" id="express_209236">Oven</Button>

    <Button variant="contained" onClick={togglePropertyMenu}>Close menus</Button>  
      {loadingIfc && (
        <div id="loader-container">
          <svg id="loading" viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
          <p>Loading...</p>
        </div>
      )}
      <div id="viewer-container" ref={containerRef} />
      {isPropertyMenuVisible && (
        <div>
          <BuildingIdContext.Provider value={buildingId}>
          <PropertiesMenu
            buildingId={buildingId}
            properties={selectedProperties}
          />
          </BuildingIdContext.Provider>
        </div>
      )}
    </>
  );
};

export default IfcViewer;
