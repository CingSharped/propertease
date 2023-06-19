import React from 'react';
import './tenant.css';

const Tenant = () => {

    return (
      <div>
        <div id="main-container">
          <h1>Hello Tenant 1</h1>
          <div id="boxno1" className="fade-in" onClick={() => this.navigateTo('./ifc')}>
            Title
          </div>
          <div id="boxno2" className="fade-in">
          Description
          </div>
          <div id="boxno3" className="fade-in">
          Tenure, Energy Rating, Bathrooms, Council Tax Band
          </div>
          <div id="boxno4" className="fade-in">
          Outstanding workorders
          </div>
        </div>
      </div>
    
    );
  }

export default Tenant;
