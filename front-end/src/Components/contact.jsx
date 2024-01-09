import React from 'react'
import { useState } from 'react'
import {Form, Row, Col, Container} from 'react-bootstrap';
import { contactServie } from "../services/user";
import rstyle from "../Components/comp2.module.css";

function Contact() {
    const [contDet, setContDet] = useState({
        name:'',
        mobile:'',
        city:'',
        email:'',
      })
    
      const [errObj, setErrObj] = useState({ 
        name:'',
        mobile:'',
        city:'',
        email:'',
      })
    
      const handleChange = (event) =>{
        const {name, value} = event.target;
        setContDet({...contDet, [name]:value});
      }
    
      const doCheck = (event)=>{
        var {name, value} = event.target;
    
        if (name === "name") {
          if (value === "") {
          setErrObj({ ...errObj, ["name"]: "*Fill your Name field" });
          return;
          } else if (/[0-9]/.test(value)) {
          setErrObj({ ...errObj, ["name"]: "*Name cannot contain numbers" });
          } else {
          setErrObj({ ...errObj, ["name"]: "" });
          }
      }
    
        if (name === "mobile") {
          if (value === "") {
          setErrObj({ ...errObj, ["mobile"]: "*Fill your Mobile field" });
          return;
          } else if (!/^[0-9]{10}$/.test(value)) {
          setErrObj({ ...errObj, ["mobile"]: "*Mobile number must have exactly 10 digits" });
          } else {
          setErrObj({ ...errObj, ["mobile"]: "" });
        }
      }
    
        if (name === "city") {
          if (value === "") {
          setErrObj({ ...errObj, ["city"]: "*Fill your City field" });
          return;
          } else if (!/^[A-Za-z]+$/.test(value)) {
          setErrObj({ ...errObj, ["city"]: "*City field can only contain alphabets" });
          } else {
          setErrObj({ ...errObj, ["city"]: "" });
        }
      }
    
        if (name === 'email' && value === "") {
          setErrObj({ ...errObj, ["email"]: "*Email cannot be empty" })
          return;
      } else if (name === "email" && !value.includes('@')) {
          setErrObj({ ...errObj, ["email"]: "*Email must contain @" })
      } else if (name === "email" && !value.includes('.')) {
          setErrObj({ ...errObj, ["email"]: "*Email must contain ." })
      } else if (name === "email" && value !== " ") {
          setErrObj({ ...errObj, ["email"]: " " });
          return;
      }
      }
    
      async function doContact(){
        try{
          const formData = new FormData();
          formData.append("email", contDet.email);
          formData.append("name", contDet.name);
          formData.append("mobile", contDet.mobile);
          formData.append("city", contDet.city);
    
          const response = await contactServie(formData);
          alert("We will soon get in touch with you!")
        }catch(error){
          alert("Failed to contact you")
        }
      }

  return (
    <div id='contact'>
        <div style={{ background: '#eaeaea', textAlign: 'center', padding: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Container>
        <h1 className="mb-4" style={{ color: '#FF6E4A', fontFamily: 'Gagalin, sans-serif', fontWeight: 'bold', paddingBottom: '20px' }}>Connect With Us</h1>
        <div className={rstyle.container}>
          <Form.Group>
            <Row>
              <Col md={6}>
                <Form.Label style={{ textAlign: 'left' }}>Full Name</Form.Label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Full Name"
                  value={contDet.name}
                  onBlur={doCheck}
                  onChange={handleChange}
                  className="form-control"
                />
              </Col>
              <Col md={6}>
                <Form.Label style={{ textAlign: 'left' }}>Contact Number</Form.Label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter your Contact Number"
                  value={contDet.mobile}
                  onBlur={doCheck}
                  onChange={handleChange}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col md={6}>
                <Form.Label style={{ textAlign: 'left' }}>City</Form.Label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your City"
                  value={contDet.city}
                  onBlur={doCheck}
                  onChange={handleChange}
                  className="form-control"
                />
              </Col>
              <Col md={6}>
                <Form.Label style={{ textAlign: 'left' }}>Email Id</Form.Label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your Email ID"
                  value={contDet.email}
                  onBlur={doCheck}
                  onChange={handleChange}
                  className="form-control"
                />
              </Col>
            </Row>
          </Form.Group>
          <div className="text-center">
            <button onClick={doContact} className={rstyle.ib} style={{ maxWidth: '200px', background: '#5dfa5d', color: 'white', fontWeight: 'bold', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s' }}>
              Contact Us
            </button>
          </div>
        </div>
      </Container>
    </div>

    </div>
  )
}

export default Contact;