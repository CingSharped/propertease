import React, { useState, useEffect} from 'react'

import Carousel from '../../components/Carousel'
import "./home.css"
import {Footer} from '../../components'

const Home = () => {
  const propertyImage = [
    "https://cdn.pixabay.com/photo/2017/04/26/18/28/london-2263346_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/08/22/10/17/kitchen-3623328_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/11/09/17/18/london-3805098_1280.jpg",
    "https://images.unsplash.com/photo-1632743441209-8a09b8a37e25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxvbmRvbiUyMGhvbWUlMjBpbnRlcmlvcnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1621983209348-7b5a63f23866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1526055577108-80193f001dde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    
  ]

  return (
    <div className='home'>
      <Carousel propertyImage={propertyImage} />

      <div className="mission-statement">
        <div className='div-border'>
          <h2>Our mission</h2>
          <p>At PropertEase we are dedicated to improving communication between landlord, tenants, and property managers.</p>
          <p>
          We aim to simplify the lives of property owners and take the stress out of managing multiple homes with our easy to use interface.</p>
          <p>
          With our intuitive dashbords our platform aims to help clients and property owners with everything from reporting issues, tracking payments, to viewing key statistics.</p>
          </div>
      </div>

      <div className="screenshot-carousel">
        <div className='screenshot-container'>
          <div className='screenshot-div-container'>
            <div className='screenshot-image'>
              <img src="../../../public/Dashboard screenshot.PNG" alt="dashboard" />
            </div>
            <div className='screenshot-description'>
              <p>
                Easy to use and intuitive dashboard to see and manage all your properties in one page.
              </p>
            </div>
          </div>

          <div className='screenshot-div-container'>
            <div className='screenshot-image'>
              <img src="../../../ifcviewer.png" alt="3D model" />
            </div>
            <div className='screenshot-description'>
              <p>Use our IFC viewer to view 3D models of your properties to quickly select regions which needs addressing to reduce ambiguity. </p>
            </div>
          </div>

          <div className='screenshot-div-container'>
            <div className='screenshot-image'>
              <img src="../../../request.png" alt="request" />
            </div>
            <div className='screenshot-description'>
              <p>Easy to use reporting lets you easily select the property in question and report incidents which can be easily viewed by all relevant people.</p>
            </div>
          </div>
        </div>
      </div>


      <Footer />




    </div>
  )
}

export default Home
