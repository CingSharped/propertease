import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
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
  //const [elemsIdfromDb, setElemsIdFromDb] = useState([]);
  const [elemsFromDb, setElemsFromDb] = useState([])
  let viewer;

  const [filterButtons, setFilterButtons] = useState();
  //const elementIds = [209236, 1306]; // get from db
  let idsArray = []
  let maintArray = []

  const fetchElemsIdArray = useCallback( async() => {
    try {
      const res = await fetch(
        "https://propertease-api.onrender.com/workorders"
      );

      const json = await res.json();

      //let idsArray = [];

      for (let i = 0; i < json.length; i++) {
        const locationId = parseInt(json[i].location_id);
        if (
          !isNaN(locationId) &&
          Number.isInteger(locationId) &&
          !idsArray.includes(locationId)
        ) {
          //check if it is an integer, and eliminate repeats
          idsArray.push(locationId);

          maintArray.push({"title": json[i].title , "locationId" : locationId})
        }
      }

      //console.log(idsArray);
      //console.log(maintArray)

      //setElemsIdFromDb(idsArray); 
      setElemsFromDb(maintArray)

    } catch (error) {
      console.log("error loading data");
    }
  }, [])

  // useEffect(() => {
  //   fetchElemsIdArray();
  //   console.log("useEffetc: ", elemsIdfromDb)
  // }, [elemsIdfromDb])

  useEffect(() => {
    fetchElemsIdArray();
    //console.log("useEffetc: ", elemsIdfromDb)
  }, [elemsFromDb])

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
    window.addEventListener("click", handleButtonClick);

    loadIfc(ifcUrl);

    //const elementIds = elemsFromDb.map(elemId => elemId.locationId);
    //console.log("elemsIdfromDb ", elemsIdfromDb);

    // const elementIds = idsArray

    // const createButtons = (elementIds) => {
    //   return elementIds.map((elementId) => {
    //     return (
    //       <Button
    //         variant="contained"
    //         key={elementId}
    //         onClick={handleButtonClick(async () => {
    //           viewer.IFC.selector.pickIfcItemsByID(0, [elementId], true);
    //           let idsArray = [elementId];
    //           const props = await viewer.IFC.getProperties(
    //             0,
    //             idsArray[0],
    //             true,
    //             false
    //           );
    //           setSelectedProperties(props);

    //           if (!isPropertyMenuVisible) {
    //             togglePropertyMenu();
    //           }
    //         })}
    //       >
    //         Element {elementId}
    //       </Button>
    //     );
    //   });
    // };

    const createButtons = (elements) => {
      return elements.map((element) => {
        const { title, locationId } = element;
        return (
          <Button
            variant="contained"
            key={locationId}
            onClick={handleButtonClick(async () => {
              viewer.IFC.selector.pickIfcItemsByID(0, [locationId], true);
              let idsArray = [locationId];
              const props = await viewer.IFC.getProperties(
                0,
                idsArray[0],
                true,
                false
              );
              setSelectedProperties(props);
    
              if (!isPropertyMenuVisible) {
                togglePropertyMenu();
              }
            })}
          >
            {title} - {locationId}
          </Button>
        );
      });
    };
    

    const buttons = createButtons(elemsFromDb);
    setFilterButtons(buttons);

    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleButtonClick);
      viewer.dispose();
    };
  }, [buildingId]); //trigger reload of the viewer, workaround to get buttons working? - buildingId should not be inside of the array...

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
      <div id="button-container">{filterButtons}</div>

      {/* <Button variant="contained" onClick={togglePropertyMenu}>
        Close menu
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
              propertyVisible = {isPropertyMenuVisible} //passing this as props - still not able to toggle propertyMenu
            />
          </BuildingIdContext.Provider>
        </div>
      )}
    </>
  );
};

export default IfcViewer;
