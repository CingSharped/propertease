import React from 'react';
import './Dashboards.css';

class Dashboards extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       slidePosition: 1,
//     };
//   }

//   componentDidMount() {
//     this.slideShow(this.state.slidePosition);
//   }

//   plusSlides = (n) => {
//     this.slideShow(this.state.slidePosition + n);
//   }

//   currentSlide = (n) => {
//     this.slideShow(n);
//   }

//   slideShow = (n) => {
//     const slides = document.getElementsByClassName('Containers');
//     const circles = document.getElementsByClassName('dots');

//     if (n > slides.length) {
//       n = 1;
//     }
//     if (n < 1) {
//       n = slides.length;
//     }

//     for (let i = 0; i < slides.length; i++) {
//       slides[i].style.display = 'none';
//     }

//     for (let i = 0; i < circles.length; i++) {
//       circles[i].className = circles[i].className.replace(' enable', '');
//     }

//     slides[n - 1].style.display = 'block';
//     circles[n - 1].className += ' enable';

//     this.setState({
//       slidePosition: n,
//     });
//   }

  navigateTo = (url) => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  }

  render() {
    return (
      <div>

        <div id="socials" className="socials">
          {/* <div className="slideshow-container fade">
            <div className="Containers">
             
            </div>
            <div className="Containers">
             
            </div>
            <div className="Containers">
              
            </div>
            <div className="Containers">
              
            </div>
            <a className="Back" onClick={() => this.plusSlides(-1)}>&#10094;</a>
            <a className="forward" onClick={() => this.plusSlides(1)}>&#10095;</a>
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <span className="dots" onClick={() => this.currentSlide(1)}></span>
            <span className="dots" onClick={() => this.currentSlide(2)}></span>
            <span className="dots" onClick={() => this.currentSlide(3)}></span>
            <span className="dots" onClick={() => this.currentSlide(4)}></span>
          </div> */}
        

        <div id="main-container">
          <div id="box1" className="fade-in" onClick={() => this.navigateTo('./IfcViewer')}>
            
          </div>
          <div id="box2" className="fade-in" onClick={() => this.navigateTo('')}>
            
          </div>
          <div id="box3" className="fade-in" onClick={() => this.navigateTo('')}>
            
          </div>
    
          <div id="box4" className="fade-in" onClick={() => this.navigateTo('')}>
          
          </div>
          <div id="box5" className="fade-in" onClick={() => this.navigateTo('')}>
           
          </div>
          <div id="box6" className="fade-in" onClick={() => this.navigateTo('')}>
            
          </div>
          <div id="box7" className="fade-in" onClick={() => this.navigateTo('')}>
            
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Dashboards;
