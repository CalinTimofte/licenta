import React, {useState, useContext} from "react";
import axios from "axios";
import ArrowButton from "./Reusables/ArrowButton";
import {LocalStorageContext} from "./LocalStorageContext.js"

export default function Dashboard(){
    let [registrationFields, changeRegistrationFields] = useState({username: "", password: ""});
    let [loginFields, changeLoginFields] = useState({username: "", password: ""});
    let [loggedIn, changeLoggedIn] = useState(document.cookie.indexOf("loggedIn") !== -1);
    const {getUserData, setUserData} = useContext(LocalStorageContext)
    let [open, reverseArrow] = useState(true);

    let overwriteFieldFactory = (field, stateHandler) => ((event) => {stateHandler(oldState => ({...oldState, [field]: event.target.value}))})
    let overwriteRegisterUser = overwriteFieldFactory("username", changeRegistrationFields);
    let overwriteRegisterPass = overwriteFieldFactory("password", changeRegistrationFields);
    let overwriteLoginUser = overwriteFieldFactory("username", changeLoginFields);
    let overwriteLoginPass = overwriteFieldFactory("password", changeLoginFields);
    let reverseMenu = () => {reverseArrow(() => (!open))}

    let retrieveUserDataPropOrEmptyString = (prop) => (getUserData()? getUserData()[prop]: "")

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
        axiosHttp.post("/logIn", {
            userName: loginFields.username,
            password: loginFields.password
        })
        .then((response) => {
            setUserData(response.data);
            checkAndModifyLoggedInStatus();
            window.location.reload();
        })
        .catch((error) => {console.log(error); window.alert(error.response.data.message);});
    } 

    let logOut = () => {
        axiosHttp.post("/updateEnv", {
            userName: getUserData().userName,
            env: getUserData().env
        })
        .then(
        axiosHttp.get("/logOut")
        .then(() => {
            setUserData({}); 
            checkAndModifyLoggedInStatus();
            window.location.reload();
        }))
        .catch((error) => {console.log(error.response); window.alert(error.response.data.message);});
    }

    return(
        <div className="dashboard">
            <ArrowButton iconNames = {{open: "right", closed: "left"}} tooltipName = "Dashboard" menuStateVar = {open} menuStateHandler = {reverseMenu}/>
             <div className="card text-white bg-secondary" style = {!open? {display:'none'} : {display: 'flex'}}>
                <div className="card-body">
                    {loggedIn? 
                        <div>
                            <p>Dashboard</p>
                            <p>UserName: {retrieveUserDataPropOrEmptyString("userName")}</p>
                            <p>Permissions: {retrieveUserDataPropOrEmptyString("priviledge") === 1? "Student" : retrieveUserDataPropOrEmptyString("priviledge") === 2? "Professor" : retrieveUserDataPropOrEmptyString("priviledge") === 3? "Admin" : "Wrong priviledge number in DB"}</p>
                            <p>Id: {retrieveUserDataPropOrEmptyString("id")}</p>
                            <div className="logout">
                                    <button className="btn btn-outline-light" onClick={logOut}>Log Out</button>
                            </div>
                        </div>
                    :
                        <div>
                            <p>Dashboard</p>
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
                        </div>}
                </div>
            </div>
        </div>
    )
}