import React, { useState, useEffect } from "react";
import rstyle from "./comp2.module.css";
import axios from "axios";
import { getUserService, saveClient, updateClient } from "../services/user";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate()
  const [obj, setObj] = useState({
    email: "",
    name: "",
    mobile: "",
    address: "",
    city: "",
    ppic: null,
    idpic: null,
    pprev:"",
    idprev: ""
  });
  const [errObj, setErrObj] = useState({
    email: "",
    name: "",
    mobile: "",
    address: "",
    city: "",
    ppic: "",
    idpic: "",
    pprev:"",
    idprev: ""
  });

  var [aemail, setAEmail] = useState("");
  useEffect(() => {
    const ae = localStorage.getItem("active_email");
    setAEmail(ae);
  }, []); // alert (aemail)

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  const token = localStorage.getItem("token");
  const getUser = async () => {
    try {
      const res = await getUserService();
      if (res.data.status) {
        // alert(JSON.stringify(res.data))
        setObj({ ...obj, email: res.data.existingUser.uid });
      } else {
        console.log(res.data.mesage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const doUpdateAll = (event) => {
    var { name, value } = event.target;
    setObj({ ...obj, [name]: value });
  };

  const doCheck = (event) => {
    var { name, value } = event.target;
    var file = event.target.files ? event.target.files[0] : null;
    // Condition for Email Id -
    if (name === "email") {
      if (value === "") {
        setErrObj({ ...errObj, ["email"]: "*Email cannot be empty" });
        return;
      } else {
        setErrObj({ ...errObj, ["email"]: "" });
        return;
      }
    }

    // Condition for Name
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

    // Condition for Mobile
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

    // Condition for Address
    if (name === "address") {
      if (value === "") {
        setErrObj({ ...errObj, ["address"]: "*Fill your Address field" });
        return;
      } else {
        setErrObj({ ...errObj, ["address"]: "" });
      }
    }

    // Condition for City
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

    if (name == "ppic") {
      setErrObj({ ...errObj, ["ppic"]: file });

      const prev = URL.createObjectURL(event.target.files[0]);

      setErrObj({...errObj, ["pprev"]: prev})
    }

    if(name == "idpic"){
        setErrObj({...errObj, ["idpic"]: file});

        const prev = URL.createObjectURL(event.target.files[0]);

        setErrObj({...errObj, ["idprev"]: prev})
    }
  };


  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    setObj({ ...obj, [name]: files[0] });

    const previewUrl = URL.createObjectURL(file);

    setErrObj({...errObj, [`${name}prev`]: previewUrl})
  };

  async function doSave() {
    try {
      const formData = new FormData();
      formData.append("email", obj.email);
      formData.append("name", obj.name);
      formData.append("mobile", obj.mobile);
      formData.append("address", obj.address);
      formData.append("city", obj.city);
      formData.append("ppic", obj.ppic);
      formData.append("idpic", obj.idpic);

      const response = await saveClient(obj);
      console.log("Save Response:", response.data);
      alert("Profile saved successfully");
      navigate("/cdashboard")
    } catch (error) {
      console.error("Error in saving data:", error.message);
      alert("Failed to save profile. Please try again");
    }
  }

  async function doUpdate() {
    try {
      const formData = new FormData();
      formData.append("email", obj.email);
      formData.append("name", obj.name);
      formData.append("mobile", obj.mobile);
      formData.append("address", obj.address);
      formData.append("city", obj.city);
      formData.append("ppic", obj.ppic);
      formData.append("idpic", obj.idpic);

      const response = await updateClient(obj)
      console.log("Update Response:", response.data);
      alert("Profile updated successfully");
      navigate("/cdashboard");
    } catch (error) {
      console.error("Error in updating data:", error.message);
      alert("Failed to update profile. Please try again");
    }
  }

  async function doFetch() {
    var url = "http://localhost:3005/user/fetch-profile?email=" + obj.email;
    var response = await axios.get(url);

    if(response.data){
        var p = response.data.p+"\\"+response.data.ppic
        setObj({
            ...obj,
            name: response.data.name,
            mobile: response.data.mobile,
            address: response.data.address,
            city: response.data.city,
            ppic: response.data.ppic,
            idpic: response.data.idpic,
            pprev: p
          });
    }else{
        console.log("No data found for the provided email.")
    }
  }

  return (
    <Container>
        
            <div className={rstyle.container}>
                <center>
                    <h2>Welcome {aemail}</h2>
                    </center>
            <Form.Group>
                <Row>
    
                <Col md={10}>
                    <label htmlFor="email">Email</label>
                    <Row>
                    <Col md={9}>
                        <input
                        type="text"
                        name="email"
                        placeholder="Enter your Email Id"
                        value={obj.email}
                        onBlur={doCheck}
                        onChange={doUpdateAll}
                        className="form-control"
                        />
                    </Col>
                    <Col md={3}>
                        <button onClick={doFetch} style={{
                          width: '200px',
                          padding: '10px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#5dfa5d', 
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s'
                      }}className={rstyle.ib}>
                        Fetch
                        </button>
                    </Col>
                    </Row>
                    <div className={rstyle.err}>{errObj.email}</div>
                </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <label htmlFor="name">Full Name</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Enter your Full Name"
                    value={obj.name}
                    onBlur={doCheck}
                    onChange={doUpdateAll}
                    className="form-control"
                    />
                    <div className={rstyle.err}>{errObj.name}</div>
                </Col>
                <Col md={6}>
                    <label htmlFor="mobile">Contact Number</label>
                    <input
                    type="text"
                    name="mobile"
                    placeholder="Enter Contact Number"
                    value={obj.mobile}
                    onBlur={doCheck}
                    onChange={doUpdateAll}
                    className="form-control"
                    />
                    <div className={rstyle.err}>{errObj.mobile}</div>
                </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <label htmlFor="city">City</label>
                    <input
                    type="text"
                    name="city"
                    placeholder="Enter your City"
                    value={obj.city}
                    onBlur={doCheck}
                    onChange={doUpdateAll}
                    className="form-control"
                    />
                    <div className={rstyle.err}>{errObj.city}</div>
                </Col>
                <Col md={6}>
                    <label htmlFor="address">Address</label>
                    <input
                    type="text"
                    name="address"
                    placeholder="Enter your Address"
                    value={obj.address}
                    onBlur={doCheck}
                    onChange={doUpdateAll}
                    className="form-control"
                    />
                    <div className={rstyle.err}>{errObj.address}</div>
                </Col>
                <Col md={6}>
                    <label htmlFor="ppic">Profile Picture</label>
                    <input type="file" name="ppic" onChange={handleFileChange} className="form-control"/>
                    {errObj.ppic && (
                        <div>
                        <p>Selected File: {obj.ppic.name}</p>
                        <img id="ppic" src={obj.ppic} alt="Preview" style={{ width: '100px' }} />
                        </div>
                    )}
                </Col>

                <Col md={6}>
                    <label htmlFor="idpic">ID Proof</label>
                    <input type="file" name="idpic" onChange={handleFileChange} className="form-control"/>
                    {errObj.idpic && (
                    <div>
                    <p>Selected File: {obj.idpic.name}</p>
                    <img src={obj.idpic} alt="ID Proof" style={{ width: '100px' }} />
                    </div>
                )}
                </Col>
                </Row>
                <Row>
                
                </Row>
            </Form.Group>
            <div className="text-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={doSave} className={rstyle.ib} style={{
                        width: '200px',
                        padding: '10px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#5dfa5d', 
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        marginRight: '5%'
                    }}>Save</button>
                <button onClick={doUpdate} className={rstyle.ib} style={{
                        width: '200px',
                        padding: '10px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#5dfa5d', 
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}>Update</button>
              </div>
            </div>
            </div>

    </Container>
  );
}

export default Profile;
