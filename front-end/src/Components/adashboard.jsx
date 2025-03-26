import React from "react";
import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import rstyle from "./comp.module.css"

function AdminDash(){
    var [aemail, setObj] = useState("");

    const navigate = useNavigate()
    useEffect(()=>{
        setObj(localStorage.getItem("active_email"));
    },[]);

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
                <h1 style={{color: "teal"}}>Admin's Dashboard</h1>
                <div style={cardContainerStyle}>
                    <div style={cardStyle}>
                        <Link to="/allclients">
                            <img
                            src="/images/client.png"
                            alt="View Clients"
                            style={{ width: "200px", height: "200px" }}
                            />
                            <br/>
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
                            }}>View Clients</button>
                        </Link>
                    </div>
                    <div style={cardStyle}>
                        <Link to="/allproviders">
                        <img
                        src="/images/provider.png"
                        alt="View Providers"
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
                        }}>View Providers</button>
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
                            transition: 'background-color 0.3s',
                            }}onClick={doLogout}>Logout</button>
                        </Link>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default AdminDash;