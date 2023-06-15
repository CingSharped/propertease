import React, { useState } from 'react';
import './Dashboards.css';
import { LargeModal, DashboardModal } from '../../components';

const Dashboards = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigateTo = (url) => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  };

  return (
    <div>
      <div id="main-container">
        <div id="box1" className="fade-in" onClick={() => navigateTo('./ifc')}>
          Total Number of Tenants: 16
        </div>
        <div id="box2" className="fade-in" onClick={() => navigateTo('')}>
          Total Number of Properties: 3
        </div>
        <div id="box3" className="fade-in" onClick={() => navigateTo('')}>
          Amount of Outstanding Maintenance Orders: 3
        </div>
        <div id="box4" className="fade-in" onClick={() => navigateTo('')}>
          Bar Graph
        </div>
        <div
          id="box5"
          className="fade-in"
          onClick={() => setIsOpen(true)}>
          Property Listing 1<br />
          Property Location: Tottenham<br />
          Current Tenant: Harley Quin
          {isOpen && <LargeModal children={<DashboardModal />} setIsOpen={setIsOpen} />}
        </div>
        <div
          id="box6"
          className="fade-in"onClick={() => setIsOpen(true)}>
          Property Listing 2<br />
          Property Location: Shoreditch<br />
          Current Tenant: Michael Scott 
          {isOpen && <LargeModal children={<DashboardModal />} setIsOpen={setIsOpen} />}
        </div>
        <div id="box7" className="fade-in"onClick={() => setIsOpen(true)}>
          Property Listing 3<br />
          Property Location: Notting Hill<br />
          Current Tenant: Beyonce Knowles
          {isOpen && <LargeModal children={<DashboardModal />} setIsOpen={setIsOpen} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboards;