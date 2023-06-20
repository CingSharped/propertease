import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import * as THREE from "three";
import PropertiesMenu from "../../components/PropertiesMenu";
import "./IfcViewer.css";
import BuildingIdContext from "../../context/BuildingIdContext";
import { Button } from "@mui/material";

const IfcViewer = ({ ifcProject }) => {

  const ifcUrl = "../ifc-models/rac_basic_sample_project-IFC4-2.ifc";
  const containerRef = useRef();
  const [selectedProperties, setSelectedProperties] = useState({});
  const [isPropertyMenuVisible, setPropertyMenuVisible] = useState(false);
  const [buildingId, setBuildingId] = useState(); //store the expressId of a building
  const [loadingIfc, setLoadingIfc] = useState(true);
  const [elemsIdfromDb, setElemsIdFromDb] = useState([])
  let viewer;

  const [filterButtons, setFilterButtons] = useState()
  //const elementIds = [209236, 1306]; // get from db

  async function fetchElemsIdArray () {
    try {
      const res = await fetch("https://propertease-api.onrender.com/workorders")
  
      const json = await res.json()

      let idsArray = []

      for (let i = 0; i < json.length; i++) {
        const locationId = parseInt(json[i].location_id);
        if (!isNaN(locationId) && Number.isInteger(locationId) && !idsArray.includes(locationId)) { //check if it is an integer, and eliminate repeats
          idsArray.push(locationId);
        }
      }
      
      console.log(idsArray)
      setElemsIdFromDb(idsArray)
      
    } catch (error) {
      console.log("error loading data")
    }

  }
  
  useEffect(() => {
    
    viewer = new IfcViewerAPI({
      container: containerRef.current,
      backgroundColor: new THREE.Color(0xffffff),
    });

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
    window.addEventListener("click", handleButtonClick)

    loadIfc(ifcUrl);

    const elementIds = elemsIdfromDb
    console.log("elemsIdfromDb ", elemsIdfromDb)

    const createButtons = (elementIds) => {
      return elementIds.map((elementId) => {
        return (
          <Button variant="contained"
            key={elementId}
            onClick={handleButtonClick(
              () =>
                viewer.IFC.selector.pickIfcItemsByID(0, [elementId], true)
            )}
          >
            Element {elementId}
          </Button>
        );
      });
    };

    const buttons = createButtons(elementIds);
    setFilterButtons(buttons)
    
    return () => {

      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleButtonClick);
      viewer.dispose();
    };
    
  }, []);

  useEffect(() => {
    fetchElemsIdArray()
  },[])
  
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

  const handleButtonClick = (callback) => {
    return () => {
      if (typeof callback === "function") {
        callback();
      }
    };
  };

  const togglePropertyMenu = () => {
    setPropertyMenuVisible(!isPropertyMenuVisible);
  };

  return (
    <>
    <div id= "button-container">{filterButtons}</div>   

      {/* <Button variant="contained" onClick={togglePropertyMenu}>
        Close menus
      </Button> */}
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
