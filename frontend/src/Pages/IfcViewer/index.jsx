// import React, { useRef, useEffect, useState } from "react";
// import { IfcViewerAPI } from "web-ifc-viewer";
// import * as THREE from "three";
// import PropertiesMenu from "../../components/PropertiesMenu";
// import ToolbarBottom  from "../../components/ToolbarBottom";
// import "./IfcViewer.css";

// const IfcViewer = ({ ifcProject }) => {
//   const containerRef = useRef();
//   const [selectedProperties, setSelectedProperties] = useState({});

//   useEffect(() => {
//     const ifcUrl = "../ifc-models/TESTED_Simple_project_01.ifc";
//     const container = containerRef.current;
//     const viewer = new IfcViewerAPI({
//       container,
//       backgroundColor: new THREE.Color(0xffffff),
//     });

//     viewer.axes.setAxes();
//     viewer.grid.setGrid();

//     const handleDoubleClick = async () => {
//       const result = await viewer.IFC.selector.pickIfcItem(true); //highlightIfcItem hides all other elements

//       //const result = await viewer.IFC.selector.highlightIfcItem(true); // use this if just want to focus on the selected element
//       if (!result) return;
//       const { modelID, id } = result;
//       const props = await viewer.IFC.getProperties(modelID, id, true, false);
//       setSelectedProperties(props);
//     };

//     const handleMouseMove = () => viewer.IFC.selector.prePickIfcItem();

//     const handleKeyDown = (event) => {
//       if (event.code === "KeyP") {
//         viewer.clipper.createPlane();
//       } else if (event.code === "KeyO") {
//         viewer.clipper.deletePlane();
//       }
//     };

//     const loadIfc = async (url) => {
//       await viewer.IFC.setWasmPath("../../../");
//       const model = await viewer.IFC.loadIfcUrl(url);
//       await viewer.shadowDropper.renderShadow(model.modelID);
//       viewer.context.renderer.postProduction.active = true;

//       ifcProject = await viewer.IFC.getSpatialStructure(model.modelID);
//       console.log(ifcProject);
//       createTreeMenu(ifcProject);
//     };

//     window.addEventListener("dblclick", handleDoubleClick);
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("keydown", handleKeyDown);

//     viewer.clipper.active = true;

//     loadIfc(ifcUrl);

//     return () => {
//       window.removeEventListener("dblclick", handleDoubleClick);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("keydown", handleKeyDown);
//       viewer.dispose();
//     };

//     // Tree view

//     // const toggler = document.getElementsByClassName("caret");
//     // for (let i = 0; i < toggler.length; i++) {
//     //   toggler[i].onclick = () => {
//     //     toggler[i].parentElement
//     //       .querySelector(".nested")
//     //       .classList.toggle("active");
//     //     toggler[i].classList.toggle("caret-down");
//     //   };
//     // }

//     // Spatial tree menu

//     function createTreeMenu(ifcProject) {
//       const root = document.getElementById("ifc-tree-menu");
//       removeAllChildren(root);
//       const ifcProjectNode = createNestedChild(root, ifcProject);
//       ifcProject.children.forEach((child) => {
//         constructTreeMenuNode(ifcProjectNode, child);
//       });
//     }

//     function nodeToString(node) {
//       return `${node.type} - ${node.expressID}`;
//     }

//     function constructTreeMenuNode(parent, node) {
//       const children = node.children;
//       if (children.length === 0) {
//         createSimpleChild(parent, node);
//         return;
//       }
//       const nodeElement = createNestedChild(parent, node);
//       children.forEach((child) => {
//         constructTreeMenuNode(nodeElement, child);
//       });
//     }

//     function createNestedChild(parent, node) {
//       const content = nodeToString(node);
//       const root = document.createElement("li");
//       createTitle(root, content);
//       const childrenContainer = document.createElement("ul");
//       childrenContainer.classList.add("nested");
//       root.appendChild(childrenContainer);
//       parent.appendChild(root);
//       return childrenContainer;
//     }

//     function createTitle(parent, content) {
//       const title = document.createElement("span");
//       title.classList.add("caret");
//       title.onclick = () => {
//         title.parentElement.querySelector(".nested").classList.toggle("active");
//         title.classList.toggle("caret-down");
//       };
//       title.textContent = content;
//       parent.appendChild(title);
//     }

//     function createSimpleChild(parent, node) {
//       const content = nodeToString(node);
//       const childNode = document.createElement("li");
//       childNode.classList.add("leaf-node");
//       childNode.textContent = content;
//       parent.appendChild(childNode);

//       childNode.onmouseenter = () => {
//         viewer.IFC.selector.prepickIfcItemsByID(0, [node.expressID]);
//       };

//       childNode.onclick = async () => {
//         viewer.IFC.selector.pickIfcItemsByID(0, [node.expressID], true);

//         let idsArray = [node.expressID];

//         const props = await viewer.IFC.getProperties(
//           0,
//           idsArray[0],
//           true,
//           false
//         );
//         //console.log(props); //call the function here
//         setSelectedProperties(props);
//         // document.getElementById("ifc-property-menu").style.display = "initial";
//         // propertiesButton.classList.add("active");
//       };
//     }

//     function removeAllChildren(element) {
//       while (element.firstChild) {
//         element.removeChild(element.firstChild);
//       }
//     }
//   }, []);

//   return (
//     <>
//       <div id="viewer-container" ref={containerRef} />
//       <div className="ifc-property-menu bottom-right" id = "ifc-property-menu">
//         <div className="ifc-property-item">
//           <div>Key</div>
//           <div className="ifc-property-value">Value</div>
//         </div>
//         <PropertiesMenu properties={selectedProperties} />
//       </div>
//       <div id="ifc-tree-menu" className= "ifc-tree-menu"></div>
//       {/* <ToolbarBottom/> */}
//       {/* Add a root element for the tree menu */}
//     </>
//   );
// };

// export default IfcViewer;


import React, { useRef, useEffect, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import * as THREE from "three";
import PropertiesMenu from "../../components/PropertiesMenu";
import ToolbarBottom from "../../components/ToolbarBottom";
import "./IfcViewer.css";

const IfcViewer = ({ ifcProject }) => {
  const containerRef = useRef();
  const [selectedProperties, setSelectedProperties] = useState({});
  const [isPropertyMenuVisible, setPropertyMenuVisible] = useState(true);
  const [isTreeMenuVisible, setTreeMenuVisible] = useState(true);

  useEffect(() => {
    const ifcUrl = "../ifc-models/TESTED_Simple_project_01.ifc";

    const handleDoubleClick = async () => {
      const result = await viewer.IFC.selector.pickIfcItem(true);
      if (!result) return;
      const { modelID, id } = result;
      const props = await viewer.IFC.getProperties(modelID, id, true, false);
      setSelectedProperties(props);
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
      console.log(ifcProject);
      createTreeMenu(ifcProject);
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

    const createTreeMenu = (ifcProject) => {
      const root = document.getElementById("ifc-tree-menu");
      removeAllChildren(root);
      const ifcProjectNode = createNestedChild(root, ifcProject);
      ifcProject.children.forEach((child) => {
        constructTreeMenuNode(ifcProjectNode, child);
      });
    };

    const nodeToString = (node) => {
      return `${node.type} - ${node.expressID}`;
    };

    const constructTreeMenuNode = (parent, node) => {
      const children = node.children;
      if (children.length === 0) {
        createSimpleChild(parent, node);
        return;
      }
      const nodeElement = createNestedChild(parent, node);
      children.forEach((child) => {
        constructTreeMenuNode(nodeElement, child);
      });
    };

    const createNestedChild = (parent, node) => {
      const content = nodeToString(node);
      const root = document.createElement("li");
      createTitle(root, content);
      const childrenContainer = document.createElement("ul");
      childrenContainer.classList.add("nested");
      root.appendChild(childrenContainer);
      parent.appendChild(root);
      return childrenContainer;
    };

    const createTitle = (parent, content) => {
      const title = document.createElement("span");
      title.classList.add("caret");
      title.onclick = () => {
        title.parentElement.querySelector(".nested").classList.toggle("active");
        title.classList.toggle("caret-down");
      };
      title.textContent = content;
      parent.appendChild(title);
    };

    const createSimpleChild = (parent, node) => {
      const content = nodeToString(node);
      const childNode = document.createElement("li");
      childNode.classList.add("leaf-node");
      childNode.textContent = content;
      parent.appendChild(childNode);

      childNode.onmouseenter = () => {
        viewer.IFC.selector.prepickIfcItemsByID(0, [node.expressID]);
      };

      childNode.onclick = async () => {
        viewer.IFC.selector.pickIfcItemsByID(0, [node.expressID], true);
        let idsArray = [node.expressID];
        const props = await viewer.IFC.getProperties(0, idsArray[0], true, false);
        setSelectedProperties(props);
      };
    };

    const removeAllChildren = (element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    };

    loadIfc(ifcUrl);

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

  const toggleTreeMenu = () => {
    setTreeMenuVisible(!isTreeMenuVisible);
  };

  // return (
  //   <>
  //     <div id="viewer-container" ref={containerRef} />
  //     <div className="ifc-property-menu bottom-right" id="ifc-property-menu">
  //       <div className="ifc-property-item">
  //         <div>Key</div>
  //         <div className="ifc-property-value">Value</div>
  //       </div>
  //       <PropertiesMenu properties={selectedProperties} />
  //     </div>
  //     <div id="ifc-tree-menu" className="ifc-tree-menu"></div>
  //   </>
  // );

  return (
    <>
      <div className="button-wrapper">
        <button onClick={toggleTreeMenu}>Toggle Tree Menu</button>
        <button onClick={togglePropertyMenu}>Toggle Property Menu</button>
      </div>
      <div id="viewer-container" ref={containerRef} />
      {isPropertyMenuVisible && (
        <div className="ifc-property-menu bottom-right" id="ifc-property-menu">
          <div className="ifc-property-item">
            <div>Key</div>
            <div className="ifc-property-value">Value</div>
          </div>
          <PropertiesMenu properties={selectedProperties} />
        </div>
      )}
      {isTreeMenuVisible && <div id="ifc-tree-menu" className="ifc-tree-menu"></div>}
    </>
  );
};

export default IfcViewer;

