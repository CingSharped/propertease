import React from 'react';
import './dashboardmodal.css';


const PropertyInformation = () => {

    return (
   
      <div>
        <div id="main-container">
          <h1>Property 1</h1>
          <div id="boxno1" className="fade-in" onClick={() => this.navigateTo('./ifc')}>
            Address: 
          </div>
          <div id="boxno2" className="fade-in">
          Bar Graph
          </div>
          
          <div id="boxno3" className="fade-in">
          Description
          </div>
          <div id="boxno4" className="fade-in">
          Tenure, Energy Rating, Bathrooms, Council Tax Band
          </div>
          <div id="boxno5" className="fade-in">
          Outstanding Workorders
            </div>
        </div>
      </div>
    
    );
  }

export default PropertyInformation;
