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
    let [studentsList, changeStudentsList] = useState([]);

    let [testImage, changeTestImage] = useState();

    let inputChangeHandlerFactory = (stateChangeFunc) => ((event) => {stateChangeFunc(event.target.value)});
    let handleUserNameChange = inputChangeHandlerFactory(changeUserName);
    let handleOldUserNameChange = inputChangeHandlerFactory(changeOldUserName);
    let handleNewUserNameChange = inputChangeHandlerFactory(changeNewUserName);
    let handlePasswordChange = inputChangeHandlerFactory(changePassword);
    let handleOldPasswordChange = inputChangeHandlerFactory(changeOldPassword);
    let handleNewPasswordChange = inputChangeHandlerFactory(changeNewPassword);

    let incrementUpdates = () => {changeUpdates(updates => updates+1)};
    let overWriteJohnsList = (newList) => {changeJohnsList(newList)};
    let overWriteStudentsList = (newList) => {changeStudentsList(newList)};
    let overWriteTestImage = (newImage) => {changeTestImage(newImage)};

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));    
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

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
                .catch((error) => {console.log(error)});
            axiosHttp.get("/getAllStudents")
                .then((response) => {overWriteStudentsList(response.data)})
                .catch((error) => {console.log(error)});
            }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updates])

    let createHandlerFactory = (route) => (() => {
        axiosHttp.post(route, {
            userName: userName,
            password: password
        }).then(() => {incrementUpdates()}).catch((error) => {console.log(error); window.alert(error.response.data.message);});
    })
    
    let createStudent = createHandlerFactory("/createStudent");
    let createProfessor = createHandlerFactory("/createProfessor");
    let createAdmin = createHandlerFactory("/createAdmin");

    let deleteAllUsers = () => {
        axiosHttp.get("/deleteAllUsers").then(() => {incrementUpdates()})
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

    let getTestImage = () => {
        axiosHttp.get("/getTestFile")
                .then((response) => {overWriteTestImage(arrayBufferToBase64(response.data.data.data))})
                .catch((error) => {console.log(error)});
    }

    let deleteAllFiles = () => {
        axiosHttp.get("/deleteAllFiles");
    }

    let signIn = () => {
        axiosHttp.post("/signIn", {
            userName: userName,
            password: password
        }).catch((error) => {console.log(error); window.alert(error.response.data.message);});
    }

    return(
        <div className="testing">
            <div>
                <label>User details:</label>
                <input type="text" placeholder = "username" onChange = {handleUserNameChange}></input>
                <input type="text" placeholder = "password" onChange= {handlePasswordChange}></input>
            </div>
            <button className="btn btn-outline-dark" onClick={createStudent}>Spawn Student</button>
            <button className="btn btn-outline-dark" onClick={createProfessor}>Spawn Professor</button>
            <button className="btn btn-outline-dark" onClick={createAdmin}>Spawn Admin</button>
            <button className="btn btn-outline-dark" onClick={deleteAllUsers}>Delete all users</button>
            <button className="btn btn-outline-dark" onClick={signIn}>Sign In</button>
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
                <p>Upload solution</p>
                <form action="http://localhost:3001/fileUpload" method="POST" encType="multipart/form-data">
                    <input type="hidden" name = "exerciseNumber" value = {15}/>
                    <input type="hidden" name = "studentID" value = "62048a05cd1c8f760d04629a"/>
                    <input type="file" className="form-control" name="solution"/>
                    <div>
                        <button type="submit" className="btn btn-outline-dark">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                <p>Users:</p>
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

            <div>
                <p>Students:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope = "col">id</th>
                            <th scope="col">User id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsList.map((student, index) => (
                            <tr key = {index}>
                                <th scope="row">{index}</th>
                                <td>{student._id}</td>
                                <td>{student.userID}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>

            <button className="btn btn-outline-dark" onClick={getTestImage}>Get test image from DB</button>
            <button className="btn btn-outline-dark" onClick={deleteAllFiles}>Delete all files</button>
            <img src = {!testImage? "#" : `data:image/jpeg;base64, ${testImage}`}></img>
        </div>
    )
}