import React, { useState, useEffect} from 'react'

import Carousel from '../../components/Carousel'
import "./home.css"

const Home = () => {
  const propertyImage = [
    "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/01/09/34/white-2563976_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg"
  ]

  return (
    <div className='home'>
      
      <Carousel propertyImage={propertyImage} />

      <div className="mission-statement">
        <h2>Our mission</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, sunt. Explicabo cum ratione, laboriosam necessitatibus consequuntur perspiciatis adipisci dolorum, reiciendis, voluptatibus beatae nobis quasi? Recusandae ab assumenda illum repellendus nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque a modi debitis earum doloribus soluta maxime delectus ipsa ea, iure fugiat velit illum, architecto neque dolor molestias necessitatibus laudantium molestiae? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, perferendis aliquid aliquam quis explicabo ratione unde sit aspernatur! Nesciunt sequi quos fuga ipsa deserunt cum illo saepe ipsam odio ratione.</p>
      </div>

      <div className="screenshots">
        <div className="row">
          <div className="column" style={{backgroundColor: 'Gray'}}>SCREENSHOT1</div>
          <div className="column">
            <h3>Screnshot description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit deserunt quia sequi enim sunt, accusantium nihil id ut earum obcaecati magni culpa ipsam deleniti ab beatae, architecto dolorum iure asperiores!</h3>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <h3>Screnshot description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit deserunt quia sequi enim sunt, accusantium nihil id ut earum obcaecati magni culpa ipsam deleniti ab beatae, architecto dolorum iure asperiores!</h3>
          </div>
          <div className="column" style={{backgroundColor: 'Gray'}}>SCREENSHOT1</div>
        </div>

        <div className="row">
          <div className="column" style={{backgroundColor: 'Gray'}}>SCREENSHOT1</div>
          <div className="column">
            <h3>Screnshot description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit deserunt quia sequi enim sunt, accusantium nihil id ut earum obcaecati magni culpa ipsam deleniti ab beatae, architecto dolorum iure asperiores!</h3>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <h3>Screnshot description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit deserunt quia sequi enim sunt, accusantium nihil id ut earum obcaecati magni culpa ipsam deleniti ab beatae, architecto dolorum iure asperiores!</h3>
          </div>
          <div className="column" style={{backgroundColor: 'Gray'}}>SCREENSHOT1</div>
        </div>

      </div>





    </div>
  )
}

export default Home
