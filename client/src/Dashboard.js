import React, {useState} from "react";
import axios from "axios";

export default function Dashboard(){
    let [registrationFields, changeRegistrationFields] = useState({username: "", password: ""});
    let [loginFields, changeLoginFields] = useState({username: "", password: ""});
    let [loggedIn, changeLoggedIn] = useState(false);

    let overwriteFieldFactory = (field, stateHandler) => ((event) => {stateHandler(oldState => ({...oldState, [field]: event.target.value}))})
    let overwriteRegisterUser = overwriteFieldFactory("username", changeRegistrationFields);
    let overwriteRegisterPass = overwriteFieldFactory("password", changeRegistrationFields);
    let overwriteLoginUser = overwriteFieldFactory("username", changeLoginFields);
    let overwriteLoginPass = overwriteFieldFactory("password", changeLoginFields);

    let checkAndModifyLoggedInStatus = () => {
        if(document.cookie.indexOf("loggedIn") !== -1)
            changeLoggedIn(true);
        else
            changeLoggedIn(false);
    }

    let axiosHttp = axios.create({
        baseURL: "http://localhost:3001",
        headers:{
            "Content-type": "application/json"
        }
    })

    let register = () => {
        axiosHttp.post("/createStudent", {
            userName: registrationFields.username,
            password: registrationFields.password
        }).catch((error) => {console.log(error); window.alert(error.response.data.message);});
    } 

    let logIn = () => {
        axiosHttp.post("/signIn", {
            userName: loginFields.username,
            password: loginFields.password
        }).then(() => {checkAndModifyLoggedInStatus()}).catch((error) => {console.log(error); window.alert(error.response.data.message);});
    } 

    let logOut = () => {
        axiosHttp.get("/signOut").then(() => {checkAndModifyLoggedInStatus()}).catch((error) => {console.log(error.response); window.alert(error.response.data.message);});
    }

    let content = {
        loggedInContent: 
            <div>
                <p>
                    Dashboard
                </p>
                <div className="logout">
                            <button className="btn btn-outline-light" onClick={logOut}>Log Out</button>
                        </div>
            </div>,
        loggedOutContent:
        <div>
            <p>
                Dashboard
            </p>
            <div className="register">
                <p>Register:</p>
                <input type="text" placeholder = "username" onChange={overwriteRegisterUser}></input>
                <input type="text" placeholder = "password" onChange={overwriteRegisterPass}></input>
                <button className="btn btn-outline-light" onClick={register}>Register</button>
            </div>
            <div className="login">
                <p>Log in:</p>
                <input type="text" placeholder = "username" onChange={overwriteLoginUser}></input>
                <input type="text" placeholder = "password" onChange={overwriteLoginPass}></input>
                <button className="btn btn-outline-light" onClick={logIn}>Log In</button>
            </div>
        </div>

    }

    return(
        <div className="dashboard">
             <div className="card text-white bg-secondary">
                <div className="card-body">
                    {loggedIn? content.loggedInContent : content.loggedOutContent}
                </div>
            </div>
        </div>
    )
}