import React from 'react';
import './Dashboards.css';

class Dashboards extends React.Component {

  navigateTo = (url) => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  }

  render() {
    return (
      <div>
          
        <div id="main-container">
          <div id="box1" className="fade-in" onClick={() => this.navigateTo('./ifc')}>
            Total Number of Tenants: 
          </div>
          <div id="box2" className="fade-in" onClick={() => this.navigateTo('')}>
          Total Number of Properties: 
          </div>
          <div id="box3" className="fade-in" onClick={() => this.navigateTo('')}>
          Amount of Outstanding Maintenance Orders:
          </div>
          <div id="box4" className="fade-in" onClick={() => this.navigateTo('')}>
          Bar Graph
          </div>
          <div id="box5" className="fade-in" onClick={() => this.navigateTo('')}>
          Property Listing 1<br></br>
          Property Location:<br></br>
          Current Tenant: 
          </div>
          <div id="box6" className="fade-in" onClick={() => this.navigateTo('')}>
          Property Listing 2<br></br>
          Property Location:<br></br>
          Current Tenant: 
          </div>
          <div id="box7" className="fade-in" onClick={() => this.navigateTo('')}>
          Property Listing 3<br></br>
          Property Location:<br></br>
          Current Tenant: 
            </div>
        </div>
      </div>
    
    );
  }
}

export default Dashboards;
