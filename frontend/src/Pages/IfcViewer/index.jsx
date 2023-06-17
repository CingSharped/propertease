import React, { useRef, useEffect, useState, useContext, createContext } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import * as THREE from "three";
import PropertiesMenu from "../../components/PropertiesMenu";
import "./IfcViewer.css";
import BuildingIdContext from "../../context/BuildingIdContext";

const IfcViewer = ({ ifcProject }) => {
  const containerRef = useRef();
  const [selectedProperties, setSelectedProperties] = useState({});
  const [isPropertyMenuVisible, setPropertyMenuVisible] = useState(false);
  const [buildingId, setBuildingId] = useState(); //store the expressId of a building 
  //const [isTreeMenuVisible, setTreeMenuVisible] = useState(true);
  const [loadingIfc, setLoadingIfc] = useState(true);
  //const [viewerState, setViewerState] = useState({});
  // const [changeFloorPlans, setChangeFloorPlans] = useState();

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

      //fix Tree menu using component
      //createTreeMenu(ifcProject);

      //const allPlans = await computeViewFloorPlans(model, viewer)

      //getFloorPlans(viewer, model);
      
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

    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      viewer.dispose();
    };
  }, []); //buildingId inside array

  // Floorplans - viewer.goTo not working
  // const getFloorPlans = async (viewer, model) => {
  //   //floorplans
  //   await viewer.plans.computeAllPlanViews(model.modelID);

  //   const lineMaterial = new THREE.LineBasicMaterial({ color: "black" });
  //   const baseMaterial = new THREE.MeshBasicMaterial({
  //     polygonOffset: true,
  //     polygonOffsetFactor: 1,
  //     polygonOffsetUnits: 1,
  //   });
  //   await viewer.edges.create(
  //     "example",
  //     model.modelID,
  //     lineMaterial,
  //     baseMaterial
  //   );

  //   // Floor plan viewing
  //   const allPlans = viewer.plans.getAll(model.modelID);

  //   for (const plan of allPlans) {
  //     const currentPlan = viewer.plans.planLists[model.modelID][plan];
  //     console.log(currentPlan);

  //     const button = document.createElement("button");
  //     button.textContent = currentPlan.name;
  //     button.onclick = () => {
  //       console.log(plan);
  //       viewer.plans.goTo(model.modelID, plan); //need s to be outisde the useEffect or use some variable to update this??
  //       viewer.edges.toggle("example", true);
  //     };
  //     containerRef.current.appendChild(button);
  //   }

  //   const exitButton = document.createElement("button");
  //   exitButton.textContent = "Exit";
  //   exitButton.onclick = () => {
  //     viewer.plans.exitPlanView();
  //     viewer.edges.toggle("example", false);
  //   };
  //   containerRef.current.appendChild(exitButton);
  // };

  const togglePropertyMenu = () => {
    setPropertyMenuVisible(!isPropertyMenuVisible);
  };

  return (
    <>
    <div>\Building id: {buildingId}</div>
      <div className="button-wrapper">
        <button onClick={togglePropertyMenu}>Toggle Property Menu</button>
      </div>
      {loadingIfc && (
        <div id="loader-container">
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
          <p>Loading...</p>
        </div>
      )}
      <div id="viewer-container" ref={containerRef} />
      {isPropertyMenuVisible && (
        <div className="ifc-property-menu bottom-right" id="ifc-property-menu">
          <div className="ifc-property-item">
            <div>Key</div>
            <div className="ifc-property-value">Value</div>
          </div>
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
