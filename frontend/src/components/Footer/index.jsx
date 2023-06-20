import React from 'react'

import './style.css'

const Footer = () => {
  return (
      <footer className="footer">
        <div className="left-section">
          <img src="PE_logo_D39B0B.png" alt="Logo" className="logo" />
          <p className="description">Property management in London<br />We put the ease in PropertEase </p>
        </div>
        <div className="right-section">
          <p className="address">Contact us</p>
          <p>Address: Propertease Ltd, 27 Old Gloucester Street,<br />London WC1N </p>
          <p>Email: contactus@propertease.co.uk</p>
          <p>Phone number: 0207-123-1234</p>
        </div>
      </footer>
  )
}

export default Footer
