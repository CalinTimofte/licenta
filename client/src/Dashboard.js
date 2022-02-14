import React, {useState, useContext} from "react";
import axios from "axios";
import ArrowButton from "./Reusables/ArrowButton";
import {LocalStorageContext} from "./LocalStorageContext.js"

export default function Dashboard(){
    let [registrationFields, changeRegistrationFields] = useState({username: "", password: ""});
    let [loginFields, changeLoginFields] = useState({username: "", password: ""});
    let [loggedIn, changeLoggedIn] = useState(document.cookie.indexOf("loggedIn") !== -1);
    const {getUserData, setUserData} = useContext(LocalStorageContext);
    let [open, reverseArrow] = useState(true);
    let [loggedInPageNum, changeLoggedInPageNum] = useState(1);
    let [loggedOutPageNum, changeLoggedOutPageNum] = useState(1);
    let [changeUsernameField, changeChangeUsernameField] = useState("");

    let overwriteFieldFactory = (field, stateHandler) => ((event) => {stateHandler(oldState => ({...oldState, [field]: event.target.value}))})
    let overwriteRegisterUser = overwriteFieldFactory("username", changeRegistrationFields);
    let overwriteRegisterPass = overwriteFieldFactory("password", changeRegistrationFields);
    let overwriteLoginUser = overwriteFieldFactory("username", changeLoginFields);
    let overwriteLoginPass = overwriteFieldFactory("password", changeLoginFields);
    let reverseMenu = () => {reverseArrow(() => (!open))}

    let retrieveUserDataPropOrEmptyString = (prop) => (getUserData()? getUserData()[prop]: "")
    let exercisesSolved = () => (getUserData().env.length);
    let clearEnv = () => {setUserData({...getUserData(), env: []}); window.location.reload();}
    let changeLocalUserName = (newUserName) => {setUserData({...getUserData(), userName: newUserName})}

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
        })
        .then((() => {
            changeLoggedInPageNum(1);
            window.location.reload();
        })())
        .catch((error) => {console.log(error); window.alert(error.response.data.message);});
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
        .catch((error) => {console.log(error.response || error); window.alert(error.response.data.message || error);});
    }

    let changeUsername = () => {
        axiosHttp.post("/updateUserName", {
            oldUserName : getUserData().userName,
            newUserName : changeUsernameField
        })
        .then(() => {
            changeLocalUserName(changeUsernameField);
            changeLoggedInPageNum(1);
            window.location.reload();
        }, (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        })
    }

    return(
        <div className="dashboard">
            <ArrowButton iconNames = {{open: "right", closed: "left"}} tooltipName = "Dashboard" menuStateVar = {open} menuStateHandler = {reverseMenu}/>
             <div className="card text-white bg-secondary" style = {!open? {display:'none'} : {display: 'flex'}}>
                <div className="card-body">
                    {loggedIn? 
                        (
                        loggedInPageNum === 1?
                            <div className="dashboard-logged-in">
                                <p>Dashboard</p>
                                <p>UserName: {retrieveUserDataPropOrEmptyString("userName")}</p>
                                <p>Exercises Solved: {exercisesSolved()} out of 18</p>
                                <div className="change-uname">
                                        <button className="btn btn-outline-light" onClick={() => {changeLoggedInPageNum(2)}}>Change user name</button>
                                </div>
                                <div className="change-pass">
                                        <button className="btn btn-outline-light" onClick={() => {changeLoggedInPageNum(3)}}>Change password</button>
                                </div>
                                <div className="reset-progress">
                                    <button className="btn btn-outline-light" onClick={clearEnv}>Reset Progress</button>
                                </div>
                                <div className="logout">
                                        <button className="btn btn-outline-light" onClick={logOut}>Log Out</button>
                                </div>
                            </div>
                        :
                        loggedInPageNum === 2?
                            <div>
                                <p>Change username:</p>
                                <input type="text" placeholder = "new username" onChange={(event) => {changeChangeUsernameField(event.target.value)}}></input>
                                <button className="btn btn-outline-light" onClick={changeUsername}>Submit</button>
                                <button className="btn btn-outline-light" onClick={() => {changeLoggedInPageNum(1)}}>Go back</button>
                            </div>
                        :
                            <div>
                                <p>Change password:</p>
                                <button className="btn btn-outline-light" onClick={() => {changeLoggedInPageNum(1)}}>Go back</button>
                            </div>
                        )
                    :
                        (
                        loggedOutPageNum === 1?
                        <div>
                            <p>Dashboard</p>
                            <p style = {{color: "red"}}>Please login to keep track of progress and to upload files!</p>
                            <div className="login">
                                <p>Log in:</p>
                                <input type="text" placeholder = "username" onChange={overwriteLoginUser}></input>
                                <input type="text" placeholder = "password" onChange={overwriteLoginPass}></input>
                                <button className="btn btn-outline-light" onClick={logIn}>Log In</button>
                            </div>
                            <button className="btn btn-outline-light" onClick={() => {changeLoggedOutPageNum(2)}}>Register</button>
                        </div>
                        :
                        <div>
                            <p>Dashboard</p>
                            <div className="register">
                                <p>Register:</p>
                                <input type="text" placeholder = "username" onChange={overwriteRegisterUser}></input>
                                <input type="text" placeholder = "password" onChange={overwriteRegisterPass}></input>
                                <button className="btn btn-outline-light" onClick={register}>Submit</button>
                                <button className="btn btn-outline-light" onClick={() => {changeLoggedOutPageNum(1)}}>Go back</button>
                            </div>
                        </div>
                        )}
                </div>
            </div>
        </div>
    )
}