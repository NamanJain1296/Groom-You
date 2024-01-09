import React, { useEffect, useState } from "react";
import axios from "axios";
import rstyle from "./comp.module.css"
import { useNavigate } from "react-router-dom";

import { signupService } from "../services/user";

function Signup() {
    const navigate = useNavigate();
    const [obj, setObj] = useState({ email: "", pwd: "", choice: " " });
    const [errObj, setErrObj] = useState({ email: " ", pwd: ' ', choice:' ' })
    const [signedUp, setSignedUp] = useState(false);

    const doUpdateBoth = (event) => {
        var { name, value } = event.target;
        setObj({ ...obj, [name]: value });
    }

    const doCheck = (event) => {
        var { name, value } = event.target;

        // Condition for Email Id -
        //... Spread operator used to quicky copy elements from one array to the other

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

        // Condition for Password
        if (name === 'pwd' && value === "") {
            setErrObj({ ...errObj, ["pwd"]: "*Password cannot be empty" })
            return;
        }else if (name === "pwd" && value !== " ") {
            setErrObj({ ...errObj, ["pwd"]: " " });
            return;
        }

        // Condition for Select Tag
        if (name === 'choice' && value === '') {
            setErrObj({...errObj, ["choice"]: "*Pick at least one choice"})
        }else if(name === 'choice' && value !== ''){
            setErrObj({...errObj, ["choice"]:""})
        }
    }

    //To check if user is already signed up
    useEffect(()=>{
        const checkSignedUp = async() =>{
            try{
                const res = await axios.get(`http://localhost:3005/user/check-signup?email=${obj.email}`)
                setSignedUp(res.data.signedUp);
            }catch(error){
                console.log(error)
            }
        }
        checkSignedUp();
    },[obj.email])

    const redirectToLogin = () =>{
        alert("Already Signed Up, Redirecting to login page");
    }

    async function saveSignup(){
        //if user already signed up
        if(signedUp){
            redirectToLogin();
            return;
        }
        // Check if any field is empty
        // .trim() removes all the extra empty spaces from the string while comparing
        if (obj.email.trim() === "" || obj.pwd.trim() === "" || obj.choice.trim() === "") {
            alert("Please fill in all fields");
            return;
        }

        try {
            // Make the axios post request
            var res = await signupService(obj)
            alert(`Entered Email: ${obj.email}\nEntered Password: ${obj.pwd}\nEntered Choice: ${obj.choice}\nResponse: ${res.data}`)
            navigate('/login');
        } catch (error) {
            // 'error' is now properly declared
            console.error("Error during login:", error.message);
            alert("An error occurred during login. Please try again.");
        }
    }

    return (
        <div>
            <form method="post" action="http://localhost:3005/user/signup-process">
                <center>
                    <div className={rstyle.container}>
                        <p>
                            <center><h2>Sign Up</h2></center>
                            <br></br>
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
                            <p>
                                <select
                                    name="choice"
                                    value={obj.choice}
                                    onChange={doUpdateBoth}
                                    onBlur={doCheck}
                                    className="form-control"
                                >
                                    <option value=""> Select an option</option>
                                    <option value="client">Client</option>
                                    <option value="serviceProvider">Service Provider</option>
                                </select>
                                <br></br>
                                <div className={rstyle.err}>
                                {errObj.choice}
                                </div>
                            </p>
                            <p>
                                <center>
                                    <input className={rstyle.ib} style={{
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
                                    }}type="button" value = "Signup" onClick={saveSignup}/>
                                </center>
                            </p>
                            <p>
                                <center>
                                    <span>
                                        Already signed up?{" "}
                                        <a href="/Login" onClick={redirectToLogin}>
                                            Login Here
                                        </a>
                                    </span>
                                </center>
                            </p>
                    </div>
                </center>
            </form>
        </div>
    )
}

export default Signup;