import React from 'react'
import { Carousel } from 'react-bootstrap';
import { Container} from 'react-bootstrap';

function Home() {
    const carouselItems = [
        {
          title: 'Home Services',
          image: 'images/Home.png',
        },
        {
          title: 'Cooking Serivces',
          image: 'images/Cooking.png',
        },
        {
          title: 'Plumbing Services',
          image: 'images/Plumbing.jpg',
        },
        {
          title: 'Electrician Services',
          image: 'images/Electrician.png',
        },
        {
          title: 'Saloon Services',
          image: 'images/Saloon.jpg',
        },
      ];
    
  return (
    <div id='home'>
    <div style={{ textAlign: 'center', padding: '8px 10px' }}>
        <style>
        {`
          .carousel-control-next-icon, .carousel-control-prev-icon {
            background-color: #fff000* Arrow color */
            border-radius: 50%;
          }
        `}
        </style>
        <Carousel>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <center>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`Slide ${index}`}
              style={{ maxHeight: '550px', maxWidth: '90%', objectFit: 'cover' }}
            /></center>
          </Carousel.Item>
        ))}
        </Carousel>
      </div>
      <Container className="my-5">
      <h2 className="text-center" style={{fontSize: '3rem', color:'#4FC8D0', marginBottom: '10px', marginTop: '-40px', ffontFamily:'Gagalin', fontWeight: 'bold'}}>Don't Miss Out! Avail Our Special Offers Today!</h2>
      <p className="text-center" style={{ fontSize: '1rem', color: '#333', lineHeight: '1.5' }}>
      Discover exclusive deals and discounts. 
      Join us now and enjoy the benefits of our premium services, <br/>
      bringing you even more savings and personalized atmosphere.
      </p>
    </Container>
    </div>
  )
}

export default Home