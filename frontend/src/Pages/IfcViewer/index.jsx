import React, { useRef, useEffect } from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';
import * as THREE from 'three';


const IfcViewer = ({ifcProject}) => {
  const containerRef = useRef();

  useEffect(() => {

    const ifcUrl = '../ifc-models/TESTED_Simple_project_01.ifc'
    const container = containerRef.current;
    const viewer = new IfcViewerAPI({
      container,
      backgroundColor: new THREE.Color(0xffffff),
    });

    viewer.axes.setAxes();
    viewer.grid.setGrid();

    window.ondblclick = () => viewer.IFC.selector.pickIfcItem(true); //then get the properties etc
    window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();

    //create clipping planes
    viewer.clipper.active = true;
    window.onkeydown = (event) => {
      if (event.code === 'KeyP') {
        viewer.clipper.createPlane();
      } else if (event.code === 'KeyO') {
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
    
      console.log(ifcProject)
    }

    loadIfc(ifcUrl)

    return () => {
      viewer.dispose();
    };
  }, []);

  return (
    <>
    
      <div  ref={containerRef} />
    </>

  )
};

export default IfcViewer;
