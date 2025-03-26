import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import rstyle from "./comp.module.css";
import { adminRequest } from "../services/user";

function Admin() {
    const navigate = useNavigate();
    const allowedEmail = process.env.REACT_APP_ALLOWED_EMAIL;
    const allowedPwd = process.env.REACT_APP_ALLOWED_PWD;
    const [obj, setObj] = useState({
        email: "",
        pwd: ""
    });
    const [errObj, setErrObj] = useState({ email: "", pwd: "" });

    const doUpdateBoth = (event) => {
        var { name, value } = event.target;
        setObj({ ...obj, [name]: value });
    }

    const doCheck = (event) => {
        var { name, value } = event.target;
        console.log("Checking email:", value, allowedEmail?.trim());
        console.log("Checking password:", value, allowedPwd?.trim());

        // Condition for Email Id -
        if (name === 'email' && value === "") {
            setErrObj({ ...errObj, ["email"]: "*Email cannot be empty" });
            return;
        } else if (name === "email" && !value.includes('@')) {
            setErrObj({ ...errObj, ["email"]: "*Email must contain @" });
        } else if (name === "email" && value.trim() !== allowedEmail?.trim()) {
            setErrObj({ ...errObj, ["email"]: " " });
            return;
        }

        // Condition for Password
        if (name === 'pwd' && value === "") {
            setErrObj({ ...errObj, ["pwd"]: "*Password cannot be empty" });
            return;
        } else if (name === "pwd" && value.trim() !== allowedPwd?.trim()) {
            setErrObj({ ...errObj, ["pwd"]: " " });
            return;
        }
    }

    async function adminEntry() {
        if (!obj.email || !obj.pwd) {
            alert("Please fill in all fields");
            return;
        }

        if (obj.email.trim() !== allowedEmail?.trim() || obj.pwd.trim() !== allowedPwd?.trim()) {
            alert("Invalid Email or Password");
            return;
        }

        try {
            //Make axios post request
            var res = await adminRequest(obj)
            alert(JSON.stringify(res.data))

            if (res.data.status === false) {
                alert(res.data.message);
            } else {
                alert(`Hello Admin, Welcome Back!!`)
                navigate("/adashboard")
            }
        } catch (error) {
            console.error("Error during entry:", error.message)
            alert("An error occurred during entry. Please try again");
        }
    }
    

    return(
        <div>
            <form method="post" action="http://localhost:3005/user/admin-process">
                <center>
                    <div className={rstyle.container}>
                        <p>
                            <center><h2>Admin Panel</h2></center>
                            <br></br>
                            <input
                            type="text"
                            name="email"
                            placeholder="Enter the Admin Supported Email"
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
                            placeholder="Enter the Admin Supported Passkey"
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
                                }} className={rstyle.ib} value = "Login" onClick={adminEntry}/>
                            </center>
                        </p>
                    </div>
                </center>
            </form>
        </div>
    )
}

export default Admin;