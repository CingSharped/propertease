import React, { useState, useEffect, useCallback, Children } from 'react'
import "./home.css"

const Home = () => {
  const data = [
    "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/01/09/34/white-2563976_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg"
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(data.length)

  const slideshowInfiniteScroll = () => {
    if (currentIndex === data.length-1) {
      return setCurrentIndex(0)
    }
    return setCurrentIndex(currentIndex+1)
  }

  const next = () => {
    if (currentIndex < (length - 1)) {
        setCurrentIndex(prevState => prevState + 1)
    }
}

  const prev = () => {
    if (currentIndex > 0) {
        setCurrentIndex(prevState => prevState - 1)
    }
}

  useEffect(() => {
    const interval = setInterval(() => {slideshowInfiniteScroll()}, 3000)
    return () => clearInterval(interval)})


  return (
    <div className='home'>
      <div className='slideshow-container'>

        {currentIndex === 0 ? "": 
          <button onClick={prev} className="left-arrow">
            &lt;
          </button>
        }
        {
          data.map((item, index) => {
            return <img 
                      className='slideshow-item'
                      style={{transform: `translate(-${currentIndex*100}%)`}}
                      key={index} src={item}
                       />
          })
        }

        {currentIndex === data.length-1 ? "" :
          <button onClick={next} className="right-arrow">
            &gt;
          </button>
        }
      </div>

      <div className="slideshow-wrapper">
        
        
      </div>

      <div>
        <h2>Our mission</h2>
      </div>





    </div>
  )
}

export default Home
