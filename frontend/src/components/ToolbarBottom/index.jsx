import React, { useEffect } from 'react';

const TreeButton = ({ onToggle }) => {
  const handleClick = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      {/* SVG code goes here */}
    </button>
  );
};

const PropertiesButton = ({ onToggle }) => {
  const handleClick = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button className="button" id="propertiesButton" onClick={handleClick}>
      {/* SVG code goes here */}
    </button>
  );
};

const ToolbarBottom = ({ children }) => {
  const [treeMenuDisplay, setTreeMenuDisplay] = React.useState('none');
  const [propertiesMenuDisplay, setPropertiesMenuDisplay] = React.useState('none');

  useEffect(() => {
    const handleTreeButtonClick = () => {
      if (treeMenuDisplay === 'initial') {
        setTreeMenuDisplay('none');
        document.getElementById('simple-card-container-home-top').className =
          'simple-card-container-home top left';
      } else {
        setTreeMenuDisplay('initial');
        document.getElementById('simple-card-container-home-top').className =
          'simple-card-container top';
      }
    };

    const handlePropertiesButtonClick = () => {
      if (propertiesMenuDisplay === 'initial') {
        setPropertiesMenuDisplay('none');
      } else {
        setPropertiesMenuDisplay('initial');
      }
    };

    if (treeMenuDisplay === 'initial') {
      document.tbody.appendChild(document.createElement('tr'));
      document.tbody.firstChild.appendChild(document.createElement('td'));
    }

    if (propertiesMenuDisplay === 'initial') {
      document.getElementById('ifc-property-menu').style.display = 'initial';
    }

    return () => {
      document.getElementById('ifc-tree-menu').removeEventListener('click', handleTreeButtonClick);
      document.getElementById('propertiesButton').removeEventListener('click', handlePropertiesButtonClick);
    };
  }, [treeMenuDisplay, propertiesMenuDisplay]);

  return (
    <div id="simple-card-container-bottom">
      <div className="simple-card-container bottom">
        <div className="toolbar">
          <TreeButton onToggle={() => setTreeMenuDisplay(treeMenuDisplay === 'initial' ? 'none' : 'initial')} />
          <PropertiesButton onToggle={() => setPropertiesMenuDisplay(propertiesMenuDisplay === 'initial' ? 'none' : 'initial')} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ToolbarBottom;
