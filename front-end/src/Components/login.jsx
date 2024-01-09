import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Client from "./cdashboard";
import Provider from "./pdashboard";
import axios from "axios";
import rstyle from "./comp.module.css"
import { loginService } from "../services/user";

function Login() {
    const navigate = useNavigate(); 
    const [obj, setObj] = useState({ email: "", pwd: ""});
    const [errObj, setErrObj] = useState({ email: " ", pwd: ' '})

    const doUpdateBoth = (event) => {
        var { name, value} = event.target;
        setObj({ ...obj, [name]: value });
    }

    const doCheck = (event) => {
        var { name, value } = event.target;

        // Condition for Email Id -
        if (name === 'email' && value == "") {
            setErrObj({ ...errObj, ["email"]: "*Email cannot be empty" })
            return;
        } else if (name === "email" && !value.includes('@')) {
            setErrObj({ ...errObj, ["email"]: "*Email must contain @" })
        } else if (name === "email" && value != " ") {
            setErrObj({ ...errObj, ["email"]: " " });
            return;
        }

        // Condition for Password
        if (name === 'pwd' && value == "") {
            setErrObj({ ...errObj, ["pwd"]: "*Password cannot be empty" })
            return;
        } else if (name === "pwd" && value != " ") {
            setErrObj({ ...errObj, ["pwd"]: " " });
            return;
        }
    }
    
    async function saveLogin() {
        // Check if any field is empty
        if (obj.email.trim() === "" || obj.pwd.trim() === "") {
            alert("Please fill in all fields");
            return;
        }
            
        try {
            // Make the axios post request
            var res = await loginService(obj)
            alert(`Entered Email: ${obj.email}\n Entered Password: ${obj.pwd}`);
            alert(JSON.stringify(res.data))
    
            if (res.data.status === false) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("active_email",res.data.existingUser.email);

                if (res.data.existingUser.choice === "client") {
                    navigate("/cdashboard");
                } else {
                    navigate("/pdashboard ");
                }
            }
        } catch (error) {
            console.error("Error during login:", error.message);
            alert("An error occurred during login. Please try again.");
        }
    }

    return (
        <div>
            <form method="post" action="http://localhost:3005/user/login-process">
                <center>
                    <div className={rstyle.container}>
                        <p>
                        <center><h2>Login</h2></center>
                        <br></br>
                                {/* Email Id: {" "} */}
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email Id"
                                    value={obj.email}
                                    onChange={doUpdateBoth}
                                    onBlur={doCheck}
                                    className="form-control"
                                />
                                <div className={rstyle.err}>
                                {errObj.email}
                                </div>
                            </p>
                            <p>
                                {/* Password: {" "} */}
                                <input
                                    type="password"
                                    name="pwd"
                                    placeholder="Enter password"
                                    value={obj.pwd}
                                    onChange={doUpdateBoth}
                                    onBlur={doCheck}
                                    className="form-control"
                                />
                                <div className={rstyle.err}>
                                {errObj.pwd}
                                </div>
                            </p>
                            <br></br>
                            <p>
                                <center>
                                    <input type="button" style={{
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
                                    }} className={rstyle.ib} value = "Login" onClick={saveLogin}/>
                                </center>
                            </p>
                    </div>
                </center>
            </form>
        </div>
    )
}

export default Login;
