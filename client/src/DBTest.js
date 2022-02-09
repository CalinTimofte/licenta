import React, {useState, useEffect} from "react";
import axios from "axios";

export default function DBTest(){
    let [userName, changeUserName] = useState("");
    let [oldUserName, changeOldUserName] = useState("");
    let [newUserName, changeNewUserName] = useState("");

    let [password, changePassword] = useState("");
    let [oldPassword, changeOldPassword] = useState("");
    let [newPassword, changeNewPassword] = useState("");

    let [updates, changeUpdates] = useState(0);
    let [johnsList, changeJohnsList] = useState([]);

    let inputChangeHandlerFactory = (stateChangeFunc) => ((event) => {stateChangeFunc(event.target.value)});
    let handleUserNameChange = inputChangeHandlerFactory(changeUserName);
    let handleOldUserNameChange = inputChangeHandlerFactory(changeOldUserName);
    let handleNewUserNameChange = inputChangeHandlerFactory(changeNewUserName);
    let handlePasswordChange = inputChangeHandlerFactory(changePassword);
    let handleOldPasswordChange = inputChangeHandlerFactory(changeOldPassword);
    let handleNewPasswordChange = inputChangeHandlerFactory(changeNewPassword);

    let incrementUpdates = () => {changeUpdates(updates => updates+1)};
    let overWriteJohnsList = (newList) => {changeJohnsList(newList)};

    let axiosHttp = axios.create({
        baseURL: "http://localhost:3001",
        headers:{
            "Content-type": "application/json"
        }
    })

    useEffect(() => {
        setTimeout(() => {
            axiosHttp.get("/getAllUsers")
                .then((response) => {overWriteJohnsList(response.data)})
                .catch((error) => {console.log(error)})}, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updates])

    let createHandlerFactory = (route) => (() => {
        axiosHttp.post(route, {
            userName: userName,
            password: password
        }).then(() => {incrementUpdates()})
    })
    
    let createStudent = createHandlerFactory("/createStudent");
    let createProfessor = createHandlerFactory("/createProfessor");
    let createAdmin = createHandlerFactory("/createAdmin");

    let deleteAllUsers = () => {
        axiosHttp.get("/deleteTestUsers").then(() => {incrementUpdates()})
    }

    let searchUser = () => {
        axiosHttp.post("/findUser", {
            userName: oldUserName
        })
    }

    let searchUSerSecurely = () => {
        axiosHttp.post("/findUserSecurely", {
            userName: oldUserName,
            password: oldPassword
        })
    }

    let searchById = () => {
        axiosHttp.post("/getOneUser", {
            id: "6203ffd2512b0cc0df5cbc03"
        })
    }

    let update = () => {
        axiosHttp.post("/findAndUpdateUser", {
            oldUserName: oldUserName,
            newUserName: newUserName,
            newPassword: newPassword
        }).then(() => {incrementUpdates()})
    }

    let updateSecure = () => {
        axiosHttp.post("/findAndUpdateUserSecurely", {
            oldUserName: oldUserName,
            newUserName: newUserName,
            oldPassword: oldPassword,
            newPassword: newPassword
        }).then(() => {incrementUpdates()})
    }

    return(
        <div className="testing">
            <div>
                <label>New User details:</label>
                <input type="text" placeholder = "username" onChange = {handleUserNameChange}></input>
                <input type="text" placeholder = "password" onChange= {handlePasswordChange}></input>
            </div>
            <button className="btn btn-outline-dark" onClick={createStudent}>Spawn Student</button>
            <button className="btn btn-outline-dark" onClick={createProfessor}>Spawn Professor</button>
            <button className="btn btn-outline-dark" onClick={createAdmin}>Spawn Admin</button>
            <button className="btn btn-outline-dark" onClick={deleteAllUsers}>Delete all users</button>
            <div>
                <label>Modify Specific John:</label>
                <input type="text" placeholder = "John Doe old username" onChange = {handleOldUserNameChange}></input>
                <input type="text" placeholder = "John Doe new username" onChange= {handleNewUserNameChange}></input>
                <input type="text" placeholder = "John Doe old password" onChange= {handleOldPasswordChange}></input>
                <input type="text" placeholder = "John Doe new password" onChange= {handleNewPasswordChange}></input>
            </div>
            <button className="btn btn-outline-dark" onClick={searchUser}>Look for user</button>
            <button className="btn btn-outline-dark" onClick={searchUSerSecurely}>Look for user (with password)</button>
            <button className="btn btn-outline-dark" onClick={update}>Update</button>
            <button className="btn btn-outline-dark" onClick={updateSecure}>Update after checking password</button>
            <div>
                <p>Johns:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope = "col">id</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Priviledge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {johnsList.map((john, index) => (
                            <tr key = {index}>
                                <th scope="row">{index}</th>
                                <td>{john._id}</td>
                                <td>{john.userName}</td>
                                <td>{john.password}</td>
                                <td>{john.priviledge}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>

            <button className="btn btn-outline-dark" onClick={searchById}>See one user</button>
        </div>
    )
}