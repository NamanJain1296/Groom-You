import React from 'react'
import {Card, Row, Col, Container} from 'react-bootstrap';
import "../Components/socialmed.css"
function Team() {
    const teamMembers = [
        {
          title: 'Mentor',
          name: 'Mr. Rajesh Bansal',
          info: 'Dive into the world of programming with my distinguished mentor, Mr. Rajesh Bansal, the brilliant mind behind the acclaimed book "Real Java." With years of experience in the software development industry, he has become a beacon for aspiring software engineers, guiding them through the intricacies of the domain',
          contactNumber: '+91 98722 46056',
          image: '/images/Mentor.jpg', 
        },
        {
          title: 'Lead Developer',
          name: 'Naman Jain',
          info: 'Embarking on a journey into Data Structures, MERN Stack Development, and Data Science, I am passionate about mastering the intricacies of these dynamic fields. Focused on problem-solving, I navigate the challenges of DSA and delve into MongoDB, Express.js, React.js, and Node.js for creating robust web applications. ',
          contactNumber: '+91 92185 97003',
          image: '/images/Developer.jpg',
        },
      ];
      
  return (
    <div id='team'>
        <div id="teamSection" style={{ background: 'white', textAlign: 'center', padding: '50px'}}>
      <Container>
        <h1 className="mb-4" style={{ color: '#FF6E4A', fontFamily: 'Gagalin, sans-serif', fontWeight: 'bold', paddingBottom:"20px"}}>Meet Our Team</h1>
        <Row>
          {teamMembers.map((member, index) => (
            <Col md={6} key={index}>
              <Card className="mb-2" style={{ borderColor: '#e0e0e0', borderRadius: '10px', borderWidth: 'thin', backgroundColor: 'whitesmoke', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <Row>
                  <Col md={4} className="text-center" style={{ padding: '10px' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ marginLeft:'10px', width: '100%', height: '100%', borderRadius: '10%', objectFit: 'cover', border: '2px solid #FF6E4A' }}
                    />
                  </Col>
                  <Col md={8}>
                  <Card.Body style={{ textAlign: 'left' }}>
                    <Card.Title style={{ fontSize: '1.7rem', fontWeight: 'bold', color: '#333' }}>{member.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '1.25rem', color: '#555' }}>{member.name}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '1.1rem', color: '#666' }}>{member.info}</Card.Text>
                    <Card.Text style={{ fontSize: '1.1rem', color: '#FF6E4A' }}>Contact: {member.contactNumber}</Card.Text>

                    <div className="social-icons mt-3">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                      </a>
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </div>
                  </Card.Body>

                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </div>
  )
}

export default Team;