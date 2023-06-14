import React, { useRef, useEffect, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import * as THREE from "three";
import PropertiesMenu from "../../components/PropertiesMenu";
//import ToolbarBottom from "../../components/ToolbarBottom";
import "./IfcViewer.css";

const IfcViewer = ({ ifcProject }) => {
  const containerRef = useRef();
  const [selectedProperties, setSelectedProperties] = useState({});
  const [isPropertyMenuVisible, setPropertyMenuVisible] = useState(false);
  const [buildingId, setBuildingId] = useState(0); //store the expressId of a building
  //const [isTreeMenuVisible, setTreeMenuVisible] = useState(true);

  useEffect(() => {
    const ifcUrl = "../ifc-models/TESTED_Simple_project_01.ifc";

    const handleDoubleClick = async () => {
      const result = await viewer.IFC.selector.pickIfcItem(true);
      if (!result) return;
      
      const { modelID, id } = result;
      //id = expressId

      const props = await viewer.IFC.getProperties(modelID, id, true, false);

       //not working consistently first time an ifc element is clicked
       console.log(props)
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
      await viewer.IFC.setWasmPath("../../../");
      const model = await viewer.IFC.loadIfcUrl(url);
      await viewer.shadowDropper.renderShadow(model.modelID);
      viewer.context.renderer.postProduction.active = true;

      ifcProject = await viewer.IFC.getSpatialStructure(model.modelID);
      //console.log(ifcProject.expressID);

      setBuildingId(ifcProject.expressID)

      //fix Tree menu using component
      //createTreeMenu(ifcProject);
    };

    const viewer = new IfcViewerAPI({
      container: containerRef.current,
      backgroundColor: new THREE.Color(0xffffff),
    });

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
  }, [buildingId]);

  const togglePropertyMenu = () => {
    setPropertyMenuVisible(!isPropertyMenuVisible);
  };

  return (
    <>
      <div className="button-wrapper">
        <button onClick={togglePropertyMenu}>Toggle Property Menu</button>
      </div>
      <div>{buildingId}</div>
      <div id="viewer-container" ref={containerRef} />
      {isPropertyMenuVisible && (
        <div className="ifc-property-menu bottom-right" id="ifc-property-menu">
          <div className="ifc-property-item">
            <div>Key</div>
            <div className="ifc-property-value">Value</div>
          </div>
          <PropertiesMenu buildingId = {buildingId} properties={selectedProperties} />
        </div>
      )}
    </>
  );
};

export default IfcViewer;

// import React from "react";
// import IfcViewerComponent from "../../components/IfcViewerComponent";

// const IfcViewer = () => {
//   //const ifcProject = { /* ... */ }; // Your ifcProject data
//   const specificUrl = "path/to/your/specific/ifc/file.ifc";

//   return (
//     <div>
//       <h1>IFC Viewer</h1>
//       <IfcViewerComponent  ifcUrl={specificUrl} />
//     </div>
//   );
// };

// export default IfcViewer;






// import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
// import { IfcViewerAPI } from "web-ifc-viewer";
// import * as THREE from "three";
// import PropertiesMenu from "../../components/PropertiesMenu";
// import "./IfcViewer.css";

// const IfcViewer = ({ ifcProject }) => {
//   const containerRef = useRef();
//   const [selectedProperties, setSelectedProperties] = useState({});
//   const [isPropertyMenuVisible, setPropertyMenuVisible] = useState(false);

//   useEffect(() => {
//     const ifcUrl = "../ifc-models/TESTED_Simple_project_01.ifc";
//     let viewer;

//     const handleDoubleClick = useCallback(async () => {
//       const result = await viewer.pickIfcItem();
//       if (!result) return;

//       const { modelID, id } = result;
//       const props = await viewer.getProperties(modelID, id, true, false);

//       setSelectedProperties(props);
//       togglePropertyMenu();
//     }, [viewer]);

//     const loadIfc = useCallback(async (url) => {
//       await viewer.setWasmPath("../../../");
//       const model = await viewer.loadIfc(url);
//       await viewer.renderShadow(model.modelID);
//       viewer.context.renderer.postProduction.active = true;

//       ifcProject = await viewer.getSpatialStructure(model.modelID);
//       console.log(ifcProject);
//     }, [viewer]);

//     viewer = new IfcViewerAPI({
//       container: containerRef.current,
//       backgroundColor: new THREE.Color(0xffffff),
//     });

//     viewer.axes.setAxes();
//     viewer.grid.setGrid();
//     viewer.clipper.active = true;

//     window.addEventListener("dblclick", handleDoubleClick);

//     loadIfc(ifcUrl);

//     return () => {
//       window.removeEventListener("dblclick", handleDoubleClick);
//       viewer.dispose();
//     };
//   }, []);

//   const togglePropertyMenu = () => {
//     setPropertyMenuVisible(!isPropertyMenuVisible);
//   };

//   return (
//     <>
//       <div className="button-wrapper">
//         <button onClick={togglePropertyMenu}>Toggle Property Menu</button>
//       </div>
//       <div id="viewer-container" ref={containerRef} />
//       {isPropertyMenuVisible && (
//         <div className="ifc-property-menu bottom-right" id="ifc-property-menu">
//           <div className="ifc-property-item">
//             <div>Key</div>
//             <div className="ifc-property-value">Value</div>
//           </div>
//           <PropertiesMenu properties={selectedProperties} />
//         </div>
//       )}
//     </>
//   );
// };

// export default IfcViewer;
