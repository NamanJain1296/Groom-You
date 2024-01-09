import React from 'react'
import "./aboutsec.css"

function About() {
  return (
    <div id='about'>
        <div id="aboutSection" className="about-container">
        <div className='about-container2'>
          <div className="about-image" style={{backgroundColor: 'whitesmoke'}}>
          <img src='/images/Groom You.png' alt="About Us" />
          </div>
          <div className="about-text">
            <h1 style={{color: '#FF6E4A',  fontFamily: 'Gagalin, sans-serif', fontWeight: 'bold'}}>About Us</h1>
            <p>At Groom You, we are dedicated to providing exceptional services that enhance your lifestyle and well-being. Whether you're looking for home services, beauty treatments, or specialized assistance, we've got you covered. Our mission is to simplify and elevate your daily life. We understand the importance of comfort, and that's why we've curated a range of services to meet your unique needs. From skilled professionals to reliable home services, Groom You is committed to making your life easier.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About