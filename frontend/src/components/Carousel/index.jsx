import React, { useState, useEffect} from 'react'

import './carousel.css'

const Carousel = ({ propertyImage }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(propertyImage.length)

    const slideshowInfiniteScroll = () => {
      if (currentIndex === propertyImage.length-1) {
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
  
          {currentIndex === 0 ? 
            "" : 
            <button
              role="previous-button" 
              onClick={prev} 
              className="left-arrow"
              aria-label='previous image'>
              &lt;
            </button>
          }
          {
            propertyImage.map((item, index) => {
              return <img 
                        role='slideshow-item'
                        className='slideshow-item'
                        style={{transform: `translate(-${currentIndex*100}%)`}}
                        key={index} 
                        src={item} alt='Building image'
                         />
            })
          }
  
          {currentIndex === propertyImage.length-1 ? "" :
            <button 
              role="next-button"
              onClick={next} 
              className="right-arrow"
              aria-label='next image'>
              &gt;
            </button>
          }
        </div>
      </div>
    )
}

export default Carousel
