import React, { useState, useEffect} from 'react'

import Carousel from '../../components/Carousel'
import "./home.css"

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
