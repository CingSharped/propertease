import React from 'react';
import { MaintenanceRequestList } from "../../components";
import { Footer } from "../../components";
import './service.css';

const Service = () => {

    return (
      <div>
        <div id="main-container">
          <h1>Hello _________</h1>
          {/* <div id="boxno1" className="fade-in" onClick={() => this.navigateTo('./ifc')}>
            Title
          </div> */}
          {/* <div id="boxno2" className="fade-in">
          Description
          </div>
          <div id="boxno3" className="fade-in">
          
          </div> */}
          <div id="boxno4" className="fade-in">
          <MaintenanceRequestList />
          </div>
        </div>
        <Footer />
      </div>
    
    );
  }

export default Service;
