import React, {useState, useEffect} from "react";
import rstyle from "./comp2.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getUserService, postReqClient } from "../services/user";

function PostReq(){
    const navigate = useNavigate();
    const [obj, setObj] = useState({
        email:"",
        cat:"",
        task:"",
        utd:"",
        loc:"",
        mobile:"",
    })
    const [errObj, setErrObj] = useState({
        email:"",
        cat:"",
        task:"",
        utd:"",
        loc:"",
        mobile:"",
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

    const doCheck = (event) =>{
        var {name, value} = event.target;

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

        //Condition for cat
        if(name === 'cat' && value === ''){
            setErrObj({...errObj, ["cat"]:"*Pick at least one choice"})
        }else if(name === 'cat' && value !== ''){
            setErrObj({...errObj, ["cat"]:""})
        }

        //Condition for Task Details
        if(name === "task"){
            if(value === ''){
                setErrObj({...errObj, ["task"]:"*Fill your Task Details"});
                return;
            }else{
                setErrObj({...errObj, ["task"]:""})
                return;
            }
        }

        //Condition for Up-to-date
        if(name === "utd"){
            if(value === ''){
                setErrObj({...errObj, ["utd"]:"*Fill your date of requirement"});
                return;
            }else{
                setErrObj({...errObj, ["utd"]:""})
                return;
            }
        }

        //Condition for Location/Site
        if(name === "loc"){
            if(value === ''){
                setErrObj({...errObj, ["loc"]:"*Fill your Location"});
                return;
            }else{
                setErrObj({...errObj, ["loc"]:""})
                return;
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
}
    async function doPost(){
        try{
            const formData = new FormData();
            formData.append("email", obj.email);
            formData.append("cat", obj.cat);
            formData.append("task", obj.task);
            formData.append("utd", obj.utd);
            formData.append("loc", obj.loc);
            formData.append("mobile", obj.mobile);

            const response = await postReqClient(obj);
            console.log("Post Response:", response.data);
            alert("Requirements Posted Successfully");
            navigate("/cdashboard");
        }catch(error){
            console.error("Error in posting data:", error.message)
            alert("Failed to post requirement. Please try again");
        }
    }
    return(
        <div className={rstyle.container}>
            <center>
                <h2>Provide your requirements to help us get started!</h2>
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
                                <div className={rstyle.err}>{errObj.email}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Label>Category</Form.Label>
                        <select
                        name="cat"
                        value={obj.cat}
                        onBlur={doCheck}
                        onChange={doUpdateAll}
                        className="form-control"
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
                    <Col md={6}>
                        <Form.Label>Location/Site</Form.Label>
                        <input
                        type="text"
                        name="loc"
                        placeholder="Enter your Location"
                        value={obj.loc}
                        onBlur={doCheck}
                        onChange={doUpdateAll}
                        className="form-control"
                        />
                        <div className={rstyle.err}>{errObj.loc}</div>
                    </Col>
                    </Row>
                
                    <Row>
                    <Col md={6}>
                        <Form.Label>Up-Till-Date</Form.Label>
                        <input
                        type="date"
                        name="utd"
                        value={obj.utd}
                        onBlur={doCheck}
                        onChange={doUpdateAll}
                        className="form-control"
                        />
                        <div className={rstyle.err}>{errObj.utd}</div>
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
                        <Form.Label>Task Details</Form.Label>
                        <textarea
                        rows={5}
                        cols={85}
                        name="task"
                        placeholder="Provide us with your Task Details..."
                        value={obj.task}
                        onBlur={doCheck}
                        onChange={doUpdateAll}
                        className="form-control"
                        />
                        <div className={rstyle.err}>{errObj.task}</div>
                    </Col>
                    </Row>
            </Form.Group>
            <div className="text-center">
            <button onClick={doPost} className={rstyle.ib} style={{
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
                    }}>Post Requirement</button>
            </div>
        </div>
    )
}

export default PostReq;
