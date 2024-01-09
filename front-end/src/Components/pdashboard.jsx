import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rstyle from "./comp.module.css"
import { useNavigate } from "react-router-dom";

function Provider(){
    var[aemail, setObj] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        setObj(localStorage.getItem("active_email"));
    },[]); // Empty brackets mean that it is going to run only once on opening the page.

    const cardContainerStyle = {
        display: "flex",
        justifyContent: "space-around", // Adjust as needed
        alignItems: "center",
        flexWrap: "wrap",
    };
    
    const cardStyle = {
        border: "1px solid #ddd",
        padding: "70px 50px",
        margin: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#f5f5f5", 
    }

    var doLogout=()=>{
        localStorage.removeItem("active_email");
        localStorage.removeItem("token");
        navigate('/');
    }

    return(
        <div style={{ background: "#f0f0f0", minHeight: "100vh" }}>
        <center>
            <br/>
            <h1 style={{color: "teal"}}>Service Provider's Dashboard</h1>
            <br/>
            {/* Welcome:{aemail} */}
            <div style={cardContainerStyle}>
                <div style={cardStyle}>
                <Link to="/provider-profile">
                    <img
                    src="/images/add-user.png"
                    alt="Add Your Profile"
                    style={{ width: "200px", height: "200px" }}
                    />
                    <br />
                    <br/>
                    <button className={rstyle.ib} style={{
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
                    }}>Add your Profile</button>
                </Link>
                </div>
                <div style={cardStyle}>
                <Link to="/searchclient">
                    <img
                    src="/images/search.png"
                    alt="Search Your Client"
                    style={{ width: "200px", height: "200px" }}
                    />
                    <br />
                    <br/>
                    <button className={rstyle.ib} style={{
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
                    }}>Search Your Client</button>
                </Link>
                </div>

                <div style={cardStyle}>
                <Link to="/">
                    <img
                    src="/images/logout.png"
                    alt="Logout"
                    style={{ width: "200px", height: "200px" }}
                    />
                    <br />
                    <br />
                <button className={rstyle.ib} style={{
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
                }} onClick={doLogout}>Logout</button>
                </Link>
                </div>
            </div>
        </center>
        </div>
    )
}

export default Provider;