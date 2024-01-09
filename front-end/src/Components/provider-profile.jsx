import React, {useState, useEffect} from "react";
import rstyle from "./comp2.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserService, modifyProvider, uploadProvider } from "../services/user";

function Service(){
    const navigate = useNavigate();
    const [obj, setObj] = useState({
        email:"",
        name:"",
        mobile:"",
        address:"",
        city:"",
        idpic: null,
        cat:"",
        expert:"",
        exp:"",
        off:"",
        desc:""
    })
    const [errObj, setErrObj] = useState({
        email:"",
        name:"",
        mobile:"",
        address:"",
        city:"",
        idpic: "",
        cat:"",
        expert:"",
        exp:"",
        off:"",
        desc:""
    })
    
    var [aemail, setAEmail] = useState("");
    useEffect(()=>{
        const ae = localStorage.getItem("active_email");
        setAEmail(ae);
    },[]); // onload 

    useEffect(()=>{
        if(token){
            getUser();
        }
    },[])

    const token = localStorage.getItem("token");
    const getUser = async() =>{
        try{
            const res = await getUserService() // to be changed
            if(res.data.status){
                setObj({...obj, email: res.data.existingUser.uid});
            }else{
                console.log(res.data.mesage);
            }
        }catch(e){
            console.log(e);
        }
    };

    const doUpdateAll = (event) => {
        var { name, value } = event.target;
        setObj({...obj, [name]: value});
    };

    const doCheck = (event) => {
        var { name, value } = event.target;
        var file = event.target.files ? event.target.files[0] : null;

        //Condition for Email ID
        if(name === "email"){
            if(value == ""){
                setErrObj({...errObj, ["email"]:"Email cannot be empty"});
                return;
            }else{
                setErrObj({...errObj, ["email"]:""});
                return;
            }
        }

        //Condition for Name
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

        //Condition for ID Proof
        if(name == "idpic"){
            setErrObj({...errObj, ["idpic"]: file});
    
            const prev = URL.createObjectURL(event.target.files[0]);
    
            setErrObj({...errObj, ["idprev"]: prev})
        }

        //Condition for cat
        if(name === 'cat' && value === ''){
            setErrObj({...errObj, ["cat"]:"*Pick at least one choice"})
        }else if(name === 'cat' && value !== ''){
            setErrObj({...errObj, ["cat"]:""})
        }

        //Condition for Expertise
        if(name === 'expert'){
            if(value === ""){
                setErrObj({...errObj, ["expert"]:"Enter your expertise"});
                return;
            }else{
                setErrObj({...errObj, ["expert"]:""})
                return;
            }
        }

        //Condition for Experience
        if(name === 'exp'){
            if(value === ''){
                setErrObj({...errObj, ["exp"]:"*Fill your Experience"})
            }else if(!/^[0-9]$/.test(value)){
                setErrObj({...errObj, ["exp"]:"*Experience must be in numbers"});
            }else{
                setErrObj({...errObj, ["exp"]:""});
            }
        }

        //Condition for Office Address
        if(name === "off"){
            if(value === ''){
                setErrObj({...errObj, ["off"]:"*Fill your Office Address"});
                return;
            }else{
                setErrObj({...errObj, ["off"]:""})
                return;
            }
        }

        //Condition for Description Box
        if(name === "desc"){
            if(value === ""){
                setErrObj({...errObj, ["desc"]:"*Fill your Bio"})
                return;
            }else{
                setErrObj({...errObj, ["desc"]:""});
                return;
            }
        }
    }

    const handleFileChange = (event) =>{
        const { name, files } = event.target
        const file = files[0];
        setObj({...obj, [name]: files[0]});
    }
    async function doUpload(){
        try{
            const formData = new FormData();
            formData.append("email", obj.email);
            formData.append("name", obj.name);
            formData.append("mobile", obj.mobile);
            formData.append("address", obj.address);
            formData.append("city", obj.city);
            formData.append("idpic", obj.idpic);
            formData.append("cat", obj.cat);
            formData.append("expert", obj.expert);
            formData.append("exp", obj.exp);
            formData.append("off", obj.off);
            formData.append("desc", obj.desc);

            const response = await uploadProvider(obj);
            console.log("Upload Response:", response.data);
            alert("Profile Uploaded Successfully");
            navigate("/pdashboard");
        }catch(error){
            console.error("Error in uploading data:", error.message)
            alert("Failed to upload profile. Please try again");
        }
    }

    async function doModify(){
        try{
            const formData = new FormData();
            formData.append("email", obj.email);
            formData.append("name", obj.name);
            formData.append("mobile", obj.mobile);
            formData.append("address", obj.address);
            formData.append("city", obj.city);
            formData.append("idpic", obj.idpic);
            formData.append("cat", obj.cat);
            formData.append("expert", obj.expert);
            formData.append("exp", obj.exp);
            formData.append("off", obj.off);
            formData.append("desc", obj.desc);

            const response = await modifyProvider(obj);
            console.log("Modify Response:", response.data);
            alert("Profile Modified Successfully");
            navigate("/pdashboard");
        }catch(error){
            console.error("Error in modifying data:", error.message)
            alert("Failed to modify profile. Please try again");
        }
    }
    return(
        <Container>
            <div className={rstyle.container}>
                <center>
                    <h2>Welcome {aemail}</h2>
                </center>
                <Form.Group>
                    <Row>
                        <Col md={10}>
                            <Form.Label>Email</Form.Label>
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
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                    <Col md={6}>
                        <Form.Label>Name</Form.Label>
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
                        <Form.Label>Contact Number</Form.Label>
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
                        <Form.Label>Address</Form.Label>
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
                        <Form.Label>City</Form.Label>
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
                    </Row>

                    <Row>
                    <Col md={6}>
                        <Form.Label>ID Proof</Form.Label>
                        <input
                        type="file"
                        name="idpic"
                        className="form-control"
                        onChange={handleFileChange}/>
                        {errObj.idpic && (
                            <div>
                                <p>
                                    Selected File: {obj.idpic}
                                </p>
                                    <img id="idpic" src={obj.idpic} alt="Preview" style={{width: '100px'}}/>
                            </div>
                        )}
                    </Col>
                    <Col md={6}>
                        <Form.Label>Category</Form.Label>
                        <select
                        name="cat"
                        value={obj.cat}
                        onBlur={doCheck}
                        className="form-control"
                        onChange={doUpdateAll}
                        >
                            <option value="">Select an option</option>
                            <option value="plumber">Plumber</option>
                            <option value="electrician">Electrician</option>
                            <option value="carpenter">Carpenter</option>
                            <option value="painting">Painting</option>
                            <option value="cook">Cook</option>
                            <option value="massage">Massage Therapy</option>
                            <option value="repair">Appliance Repair</option>
                            <option value="tutor">Home Tutors</option>
                        </select>
                        <div className={rstyle.err}>{errObj.cat}</div>
                    </Col>
                    </Row>

                    <Row>
                    <Col md={8}>
                        <Form.Label>Expert In</Form.Label>
                        <input
                        type="text"
                        name="expert"
                        placeholder="Brief about Expertise"
                        value={obj.expert}
                        onBlur={doCheck}
                        onChange={doUpdateAll}
                        className="form-control"
                        />
                        <div className={rstyle.err}>{errObj.expert}</div>
                    </Col>
                    <Col md={3}>
                        <Form.Label>Experience</Form.Label>
                        <input
                        type="number"
                        name="exp"
                        placeholder="Experience(in Numbers)"
                        value={obj.exp}
                        onBlur={doCheck}
                        onChange={doUpdateAll}
                        className="form-control"
                        />
                        <div className={rstyle.err}>{errObj.city}</div>
                    </Col>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <Form.Label>Office Address</Form.Label>
                            <input
                            type="text"
                            name="off"
                            placeholder="Provide us with your Office Address..."
                            value={obj.off}
                            onBlur={doCheck}
                            onChange={doUpdateAll}
                            className="form-control"
                            />
                            <div className={rstyle.err}>{errObj.off}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <Form.Label>Other Information</Form.Label>
                            <textarea
                            rows={5}
                            cols={80}
                            name="desc"
                            placeholder="Provide us with some insights..."
                            value={obj.desc}
                            onBlur={doCheck}
                            onChange={doUpdateAll}
                            className="form-control"
                            />
                            <div className={rstyle.err}>{errObj.desc}</div>
                        </Col>
                    </Row>
                </Form.Group>
                <div className="text-center">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={doUpload} className={rstyle.ib} style={{
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
                        marginRight:'5%'
                    }}>Upload</button>
                    <button onClick={doModify={}} className={rstyle.ib} style={{
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
                    }}>Modify</button>
                </div>
                </div>
            </div>
        </Container>
    )
}

export default Service;