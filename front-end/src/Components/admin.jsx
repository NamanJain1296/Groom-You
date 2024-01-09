import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import rstyle from "./comp.module.css";
import { adminRequest } from "../services/user";

function Admin(){
    const allowedEmail = "panel123@groomyou.com";
    const allowedPwd = "panel123";
    const navigate = useNavigate();
    const [obj, setObj] = useState({email:"", pwd:""});
    const [errObj, setErrObj] = useState({email:"", pwd:""});

    const doUpdateBoth = (event) =>{
        var {name, value} = event.target;
        setObj({...obj, [name]:value});
    }

    const doCheck = (event) =>{
        var {name, value} = event.target;

        //Condition for email
        if(name === 'email' && value == ""){
            setErrObj({...errObj, ['email']:"*Email cannot be empty"})
            return;
        }else if (name === "email" && !value.includes('@')) {
            setErrObj({ ...errObj, ["email"]: "*Email must contain @" })
        } else if (value != allowedEmail) {
            setErrObj({ ...errObj, ["email"]: "*Invalid email" });
            return;
        }

        // Condition for Password
    if (name === 'pwd') {
        if (value === "") {
            setErrObj({ ...errObj, ["pwd"]: "*Password cannot be empty" });
            return;
        } else if (value != allowedPwd) {
            setErrObj({ ...errObj, ["pwd"]: "*Invalid password" });
            return;
        }
        }
    }

    async function adminEntry(){
        if(obj.email.trim() === "" || obj.pwd.trim() === ""){
            alert("Please fill in all fields");
            return;
        }

        try{
            //Make axios post request
            var res = await adminRequest(obj)
            alert(JSON.stringify(res.data))

            if(res.data.status === false){
                alert(res.data.message);
            }else{
                alert(res.data.message);
                alert(`Hello Admin`)
                navigate("/adashboard")
            }
        }catch(error){
            console.error("Error during entrying:", error.message)
            alert("An error occured during entry. Please try again");
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