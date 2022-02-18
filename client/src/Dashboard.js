import React, {useState, useContext} from "react";
import axios from "axios";
import ArrowButton from "./Reusables/ArrowButton";
import {LocalStorageContext} from "./LocalStorageContext.js"

export default function Dashboard({changePage}){
    let [registrationFields, changeRegistrationFields] = useState({username: "", password: "", checkPassword: "", classRoom: ""});
    let [loginFields, changeLoginFields] = useState({username: "", password: ""});
    let [loggedIn, changeLoggedIn] = useState(document.cookie.indexOf("loggedIn") !== -1);
    const {getUserData, setUserData} = useContext(LocalStorageContext);
    let [open, reverseArrow] = useState(true);
    let [loggedInPageNum, changeLoggedInPageNum] = useState(1);
    let [loggedOutPageNum, changeLoggedOutPageNum] = useState(1);
    let [changeUsernameField, changeChangeUsernameField] = useState("");
    let [classRooms, changeClassRooms] = useState([]);
    let [changeClassRoomField, changeChangeClassRoomField] = useState();
    let [changePasswordField, changeChangePasswordField] = useState("");
    let [changeOldPasswordField, changeOldChangePasswordField] = useState("");
    let priviledge = loggedIn? getUserData().priviledge : 1;

    let initialErrorState = {
        username: {
            tooShort:{
                active: false,
                text: "Please enter at least 5 characters!"
            },
            tooLong: {
                active: false,
                text: "Please enter less than 40 characters!"
            }
        },
        password: {
            tooShort:{
                active: false,
                text: "Please enter at least 8 characters!"
            },
            tooLong: {
                active: false,
                text: "Please enter less than 40 characters!"
            }
        },
        checkPassword: {
            mismatched: {
                active: false,
                text: "Passwords entered don't match!"
            }}
    }

    let [registerFormErrors, changeRegisterFormErrors] = useState(initialErrorState);

    let overwriteFieldFactory = (field, stateHandler) => ((event) => {stateHandler(oldState => ({...oldState, [field]: event.target.value}))});
    let overwriteRegisterUser = overwriteFieldFactory("username", changeRegistrationFields);
    let overwriteRegisterPass = overwriteFieldFactory("password", changeRegistrationFields);
    let overwriteRegisterCheckPassword = overwriteFieldFactory("checkPassword", changeRegistrationFields);
    let overwriteRegisterClassRoom = overwriteFieldFactory("classRoom", changeRegistrationFields);
    let setInitialRegisterClassRoom = (value) => {changeRegistrationFields(oldState => ({...oldState, classRoom: value}))};
    let overwriteLoginUser = overwriteFieldFactory("username", changeLoginFields);
    let overwriteLoginPass = overwriteFieldFactory("password", changeLoginFields);
    let reverseMenu = () => {reverseArrow(() => (!open))};

    let retrieveUserDataPropOrEmptyString = (prop) => {let userDataLocal = getUserData(); return(userDataLocal? (userDataLocal[prop] === null? "unassigned" : userDataLocal[prop]): "")}
    let exercisesSolved = () => (priviledge !== 1? "" : getUserData().env.length);
    let clearEnv = () => {setUserData({...getUserData(), env: []}); window.location.reload();}
    let changeLocalUserName = (newUserName) => {setUserData({...getUserData(), userName: newUserName})}
    let changeLocalClassRoomName = (newClassRoomName) => {setUserData({...getUserData(), classRoomName: newClassRoomName})}
    let setUserDataByPriviledge = (userData) => {
        if (priviledge === 1){
            setUserData(userData);
        }
        else
            setUserData({...userData, env: []})
    }

    let checkAndModifyLoggedInStatus = () => {
        if(document.cookie.indexOf("loggedIn") !== -1)
            changeLoggedIn(true);
        else
            changeLoggedIn(false);
    }

    let setErrors = () => {
        if (registrationFields.username.length < 5)
            changeRegisterFormErrors(registerFormErrors => ({...registerFormErrors, username: {...registerFormErrors.username, tooShort: {...registerFormErrors.username.tooShort, active: true}}}))
        if (registrationFields.username.length > 40)
            changeRegisterFormErrors(registerFormErrors => ({...registerFormErrors, username: {...registerFormErrors.username, tooLong: {...registerFormErrors.username.tooLong, active: true}}}))
        if (registrationFields.password.length < 8)
            changeRegisterFormErrors(registerFormErrors => ({...registerFormErrors, password: {...registerFormErrors.password, tooShort: {...registerFormErrors.password.tooShort, active: true}}}))
        if (registrationFields.password.length > 40)
            changeRegisterFormErrors(registerFormErrors => ({...registerFormErrors, password: {...registerFormErrors.password, tooLong: {...registerFormErrors.password.tooLong, active: true}}}))
        if (registrationFields.password !== registrationFields.checkPassword)
            changeRegisterFormErrors(registerFormErrors => ({...registerFormErrors, checkPassword: {...registerFormErrors.checkPassword, mismatched: {...registerFormErrors.checkPassword.mismatched, active: true}}}))
    }

    let resetErrors = () => {
        changeRegisterFormErrors(initialErrorState)
    }

    let  checkForActiveErrors = () => {
        let err = false;
        if (registerFormErrors.username.tooShort.active)
            err = true;
        if (registerFormErrors.username.tooLong.active)
            err = true;
        if (registerFormErrors.password.tooShort.active)
            err = true;
        if (registerFormErrors.password.tooShort.active)
            err = true;
        if (registerFormErrors.checkPassword.mismatched.active)
            err = true;
        return err;
    }

    let axiosHttp = axios.create({
        baseURL: "http://localhost:3001",
        headers:{
            "Content-type": "application/json"
        }
    })

    let register = () => {
        // error check
        resetErrors();
        setErrors();
        if(checkForActiveErrors()) return;

        axiosHttp.post("/createStudent", {
            userName: registrationFields.username,
            password: registrationFields.password,
            checkPassword: registrationFields.checkPassword,
            classRoom: registrationFields.classRoom,
        })
        .then(() => {
            changeLoggedOutPageNum(1);
        },
        (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        })
    } 

    let logIn = () => {
        axiosHttp.post("/logIn", {
            userName: loginFields.username,
            password: loginFields.password
        })
        .then((response) => {
            priviledge = response.data.priviledge;
            setUserDataByPriviledge(response.data);
            checkAndModifyLoggedInStatus();
            window.location.reload();
        })
        .catch((error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        });
    } 

    let logOut = () => {
        if (priviledge === 1){
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
            .catch((error) => {console.log(error.response || error); window.alert(error.response.data.message || error);});}
        else
            {axiosHttp.get("/logOut")
            .then(() => {
                setUserData({}); 
                checkAndModifyLoggedInStatus();
                window.location.reload();
            })
            .catch((error) => {console.log(error.response || error); window.alert(error.response.data.message || error);});}
    }

    let changeUsername = () => {
        axiosHttp.post("/updateUserName", {
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

    let getAllClassRoomNames = () => {
        axiosHttp.get("/getAllClassroomNames")
        .then((response) => {changeClassRooms(response.data.classRoomNames); setInitialRegisterClassRoom(response.data.classRoomNames[0]); changeChangeClassRoomField(response.data.classRoomNames[0])})
        .catch((error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        });
    }

    let updateClassRoom = () => {
        axiosHttp.post("/updateClassRoom", {
            userName : getUserData().userName,
            classRoomName : changeClassRoomField
        })
        .then(() => {
            changeLocalClassRoomName(changeClassRoomField);
            changeLoggedInPageNum(1);
            window.location.reload();
        }, (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        })
    }

    let updatePassword = () => {
        axiosHttp.post("/updateUserPassword", {
            oldPassword : changeOldPasswordField,
            password : changePasswordField
        })
        .then(() => {
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
                                {priviledge === 1? <p>ClassRoom: {retrieveUserDataPropOrEmptyString("classRoomName")}</p>: ""}
                                {priviledge === 1? <p>Exercises Solved: {exercisesSolved()} out of 18</p> : ""}
                                <div className="change-uname">
                                        <button className="btn btn-outline-light" onClick={() => {changeLoggedInPageNum(2)}}>Change user name</button>
                                </div>
                                <div className="change-pass">
                                        <button className="btn btn-outline-light" onClick={() => {changeLoggedInPageNum(3)}}>Change password</button>
                                </div>
                                
                                {priviledge === 1? 
                                <div className="change-class">
                                        <button className="btn btn-outline-light" onClick={() => {getAllClassRoomNames(); changeLoggedInPageNum(4)}}>Change class room</button>
                                </div> : ""}
                                
                                {priviledge === 1? 
                                <div className="reset-progress">
                                    <button className="btn btn-outline-light" onClick={clearEnv}>Reset Progress</button>
                                </div>
                                : ""}

                                <div className="logout">
                                        <button className="btn btn-outline-light" onClick={logOut}>Log Out</button>
                                </div>
                                {
                                    priviledge === 2? 
                                        <button className="btn btn-outline-light" onClick={() => {changePage(2)}}>Professor pannel</button>
                                    :
                                    priviledge === 3?
                                        <div>
                                            <button className="btn btn-outline-light" onClick={() => {changePage(3)}}>Admin pannel</button>
                                            <button className="btn btn-outline-light" onClick={() => {changePage(4)}}>Super admin dash</button>
                                        </div>
                                    : ""
                                }
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
                        loggedInPageNum === 3?
                            <div>
                                <p>Change password:</p>
                                <input type="password" placeholder = "old password" onChange={(event) => {changeOldChangePasswordField(event.target.value)}}></input>
                                <input type="password" placeholder = "new password" onChange={(event) => {changeChangePasswordField(event.target.value)}}></input>
                                <button className="btn btn-outline-light" onClick={updatePassword}>Submit</button>
                                <button className="btn btn-outline-light" onClick={() => {changeLoggedInPageNum(1)}}>Go back</button>
                            </div>
                        :
                            <div>
                                <div>
                                <label for = "classRooms">Choose a classRoom:</label>
                                    <select class="form-select" id="classRooms" name="classRooms"
                                        onChange={(event) => {changeChangeClassRoomField(event.target.value)}}>
                                        {classRooms.map((classRoomName, index) => (<option value={classRoomName} key={index}>{classRoomName}</option>))}
                                    </select> 
                                </div>
                                <button className="btn btn-outline-light" onClick={updateClassRoom}>Submit</button>
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
                                <input type="password" placeholder = "password" onChange={overwriteLoginPass}></input>
                                <button className="btn btn-outline-light" onClick={logIn}>Log In</button>
                            </div>
                            <button className="btn btn-outline-light" onClick={() => {getAllClassRoomNames(); changeLoggedOutPageNum(2);}}>Register</button>
                            <button className="btn btn-outline-light" onClick={() => {changePage(4)}}>Super admin dash</button>
                        </div>
                        :
                        <div>
                            <p>Dashboard</p>
                            <div className="register">
                                <p>Register:</p>
                                <input type="text" placeholder = "username" onChange={overwriteRegisterUser} 
                                style = {registerFormErrors.username.tooShort.active || registerFormErrors.username.tooLong.active? {borderColor: "red"} : {}}></input>
                                {registerFormErrors.username.tooShort.active?
                                    <p style = {{color: "red"}}>{registerFormErrors.username.tooShort.text}</p>:
                                registerFormErrors.username.tooLong.active? 
                                    <p style = {{color: "red"}}>{registerFormErrors.username.tooLong.text}</p>:
                                    ""
                                }
                                <br/>
                                <input type="password" placeholder = "password" onChange={overwriteRegisterPass}
                                style = {registerFormErrors.password.tooShort.active || registerFormErrors.password.tooLong.active? {borderColor: "red"} : {}}></input>
                                {registerFormErrors.password.tooShort.active?
                                    <p style = {{color: "red"}}>{registerFormErrors.password.tooShort.text}</p>:
                                registerFormErrors.password.tooLong.active? 
                                    <p style = {{color: "red"}}>{registerFormErrors.password.tooLong.text}</p>:
                                    ""
                                }
                                <br/>
                                <input type="password" placeholder = "password check" onChange={overwriteRegisterCheckPassword}
                                style = {registerFormErrors.checkPassword.mismatched.active? {borderColor: "red"} : {}}></input>
                                {registerFormErrors.checkPassword.mismatched.active?
                                    <p style = {{color: "red"}}>{registerFormErrors.checkPassword.mismatched.text}</p>:
                                    ""
                                }
                                <br/>
                                <div>
                                    <label for = "classRooms">Choose a classRoom:</label>
                                    <select class="form-select" id="classRooms" name="classRooms"
                                        onChange={overwriteRegisterClassRoom}>
                                        {classRooms.map((classRoomName, index) => (<option value={classRoomName} key={index}>{classRoomName}</option>))}
                                    </select> 
                                </div>
                                <button className="btn btn-outline-light" onClick={register}>Submit</button>
                                <br/>
                                <button className="btn btn-outline-light" onClick={() => {changeLoggedOutPageNum(1)}}>Go back</button>
                            </div>
                        </div>
                        )}
                </div>
            </div>
        </div>
    )
}