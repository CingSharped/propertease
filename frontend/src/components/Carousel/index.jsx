import React, { useState, useEffect} from 'react'

import './carousel.css'

const Carousel = (data) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(data.data.length)
    // console.log(data.data)

    const slideshowInfiniteScroll = () => {
      if (currentIndex === data.data.length-1) {
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
      <div className='carousel'>
        <div className='slideshow-container'>
  
          {currentIndex === 0 ? "": 
            <button onClick={prev} className="left-arrow">
              &lt;
            </button>
          }
          {
            data.data.map((item, index) => {
              return <img 
                        className='slideshow-item'
                        style={{transform: `translate(-${currentIndex*100}%)`}}
                        key={index} src={item}
                         />
            })
          }
  
          {currentIndex === data.data.length-1 ? "" :
            <button onClick={next} className="right-arrow">
              &gt;
            </button>
          }
        </div>
      </div>
    )
}

export default Carousel
