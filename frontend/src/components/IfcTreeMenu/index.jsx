import {React, useEffect} from "react";

const IfcTreeMenu = ({ ifcProject }) => {
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
        if (isPropertyMenuVisible == false) { togglePropertyMenu()}
      };
    };

  const removeAllChildren = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  useEffect(() => {
    if (ifcProject) {
      createTreeMenu(ifcProject);
    }
  }, [ifcProject]);

  return <div id="ifc-tree-menu" className="ifc-tree-menu"></div>;
};

export default IfcTreeMenu;
