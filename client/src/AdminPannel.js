import React, {useState} from "react";
import ReactangleDivider from "./Reusables/RectangleDivider";
import axios from "axios";

export default function AdminPannel({changePage}){
    let [usersList, changeUsersList] = useState([]);
    let [professorList, changeProfessorList] = useState([]);
    let [studentsList, changeStudentsList] = useState([]);
    let [classRoomList, changeClassRoomList] = useState([]);
    let [showing, changeShowing] = useState({users: false, students: false, classRooms: false})
    let [selectedField, setSelectedField] = useState({selected: false})
    let [userName, changeUserName] = useState("");
    let [password, changePassword] = useState("");
    let [changePasswordField, changeChangePasswordField] = useState("");

    let [selectedProfessorID, changeSelectedProfessorID] = useState();

    let [newClassRoomName, changenewClassRoomName] = useState('');

    let axiosHttp = axios.create({
        baseURL: "http://localhost:3001",
        headers:{
            "Content-type": "application/json"
        }
    })

    let showFactory = (showObj) => (() => {changeShowing(oldShow => ({...oldShow, [showObj]: true}))})
    let showUsers = showFactory("users");
    let showStudents = showFactory("students");
    let showClassRooms = showFactory("classRooms");

    let getUsers = () => {
        axiosHttp.get("/getAllUsers")
                .then((response) => {changeUsersList(response.data); showUsers()})
                .catch((error) => {
                    let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                    window.alert(message);
                });
    }

    let createHandlerFactory = (route) => (() => {
        axiosHttp.post(route, {
            userName: userName,
            password: password
        }).then(() => {getUsers(); getStudents(); getClassRooms();}).catch((error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            window.alert(message);
        });
    })
    
    let createStudent = createHandlerFactory("/createStudentAdmin");
    let createProfessor = createHandlerFactory("/createProfessor");
    let createAdmin = createHandlerFactory("/createAdmin");

    let getStudents = () => {
        axiosHttp.get("/getAllStudents")
                .then((response) => {
                    changeStudentsList(response.data);
                    axiosHttp.get("/getAllUsers")
                        .then((response) => {changeUsersList(response.data);})
                        .catch((error) => {
                            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                            window.alert(message);
                        })
                })
                .then(showStudents())
                .catch((error) => {
                    let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                    window.alert(message);
                });
    }

    let getClassRooms = () => {
        axiosHttp.get("/getAllClassRooms")
                .then((response) => {changeClassRoomList(response.data); showClassRooms()})
                    .then(() => 
                        {(axiosHttp.get("/getAllProfessors")
                        .then((response) => {changeProfessorList(response.data); changeSelectedProfessorID(response.data[0]._id);})
                        .catch((error) => {
                            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                            window.alert(message);
                        }))}
                        )
                .catch((error) => {
                    let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                    window.alert(message);
                });
    }

    let resetSelectedField = () => {setSelectedField({selected: false})};

    let selectClassRoom = (data) => {
        setSelectedField({
            selected: true,
            type: "classRoom",
            data: data
        })
    }

    let selectUser = (data) => {
        setSelectedField({
            selected: true,
            type: "user",
            data: data
        })
    }

    let submitProfessorChange = () => {
        axiosHttp.put("/updateClassRoomProfessor", {
            classRoomID : selectedField.data._id,
            professorID : selectedProfessorID
        })
        .then(setTimeout(() => {
            getClassRooms();
            resetSelectedField();
        }, 200), (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            window.alert(message);
        })
    }

    let getStoredUserNameProfessor = (profID) => {
        let name_in_arr = professorList.filter(professor => professor._id === profID);
        if (name_in_arr.length === 0)
            return "";
        else
            return(name_in_arr[0].userName)
    }
    
    let getStoredUserNameStudent = (studentUserID) => {
        let name_in_arr = usersList.filter(user => user._id === studentUserID);
        if (name_in_arr.length === 0)
            return "";
        else
            return(name_in_arr[0].userName);
    }

    let deleteClassRoom = (classRoomName) => {
        axiosHttp.put("/deleteClassRoom", {
            classRoomName: classRoomName
        })
        .then(() => {
            getClassRooms();
            getStudents();
            resetSelectedField();
        }, (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            window.alert(message);
        })
    }

    let deleteUser = (data) => {
        axiosHttp.put("/deleteUser", {
            data: data
        })
        .then(() => {
            getUsers();
            getStudents();
            getClassRooms();
            resetSelectedField();
        }, (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            window.alert(message);
        })
    }

    let createClassRoom = () => {
        axiosHttp.post("/createClassRoom", {
            classRoomName: newClassRoomName
        })
        .then(() => {getClassRooms()},
        (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            window.alert(message);
        });
    }

    let updatePassword = (data) => {
        axiosHttp.post("/updateUserPasswordAdmin", {
            id: data._id,
            password : changePasswordField
        })
        .then(() => {
            resetSelectedField();
        }, (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            window.alert(message);
        })
    }


    return (
        <div>
            <p>Admin content</p>

            <ReactangleDivider>
                <p>If you hover over a table row and it is highlighted, you can click on it.</p> 
            </ReactangleDivider>

            {selectedField.selected? 
             (
                 selectedField.type === "classRoom" ? 
                    <div class = "admin-classroom">
                        <ReactangleDivider>
                            <p>Classroom : {selectedField.data.classRoomName}</p>
                            <p>Proffessor : {(selectedField.data.proffesorID === undefined || selectedField.data.proffesorID === null)? "Professor not yet assigned" : getStoredUserNameProfessor(selectedField.data.proffesorID)}</p>
                        </ReactangleDivider>

                        <ReactangleDivider>
                        <div>
                            <label for = "professors">Assign a new professor:</label>
                            <select class="form-select" id="professors" name="professors"
                                onChange={(event) => changeSelectedProfessorID(event.target.value)}>
                                {professorList.map((professor, index) => (<option value={professor._id} key={index}>{professor.userName}</option>))}
                            </select> 
                            <button className="btn btn-outline-dark" onClick={submitProfessorChange}>Assign</button>
                        </div>
                        </ReactangleDivider>

                        <ReactangleDivider>
                            <p>Delete this class room</p>
                            <p><button className="btn btn-outline-danger" onClick={() => {deleteClassRoom(selectedField.data.classRoomName)}}>Delete</button></p>
                        </ReactangleDivider>

                        <button className="btn btn-outline-dark" onClick={resetSelectedField}>Go back</button>
                    </div>:
                selectedField.type === "user" ?
                <div class = "admin-user">
                    <ReactangleDivider>
                        <p>User : {selectedField.data.userName}</p>
                        <p>type : {selectedField.data.priviledge === 1? "Student" : selectedField.data.priviledge === 2? "Professor" : selectedField.data.priviledge === 3 ? "Admin" : "Wrong Value"}</p>
                    </ReactangleDivider>

                    <ReactangleDivider>
                        <p>Delete this user</p>
                        <p><button className="btn btn-outline-danger" onClick={() => {deleteUser(selectedField.data)}}>Delete</button></p>
                    </ReactangleDivider>

                    <ReactangleDivider>
                        <div>
                            <p>Change password:</p>
                            <input type="text" placeholder = "new password" onChange={(event) => {changeChangePasswordField(event.target.value)}}></input>
                            <button className="btn btn-outline-dark" onClick={() => updatePassword(selectedField.data)}>Submit</button>
                        </div>
                    </ReactangleDivider>

                    <button className="btn btn-outline-dark" onClick={resetSelectedField}>Go back</button>
                </div> : ""
             )
            :
            <div>
                <button className="btn btn-outline-dark" onClick={getUsers}>Show Users</button>
                {showing.users? 
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
                            {usersList.map((user, index) => (
                                    <tr className = "clickable-tr" key = {index} onClick = {() => {selectUser(user)}}>
                                    <th scope="row">{index}</th>
                                    <td>{user._id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.password}</td>
                                    <td>{user.priviledge}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        
                        <ReactangleDivider>
                            <div>
                                <label>User details:</label>
                                <input type="text" placeholder = "username" onChange = {(event) => {changeUserName(event.target.value)}}></input>
                                <input type="text" placeholder = "password" onChange= {(event) => {changePassword(event.target.value)}}></input>
                            </div>
                            <button className="btn btn-outline-success" onClick={createStudent}>Create Student</button>
                            <button className="btn btn-outline-success" onClick={createProfessor}>Create Professor</button>
                            <button className="btn btn-outline-success" onClick={createAdmin}>Create Admin</button>
                        </ReactangleDivider>

                    </div>: ""}

                <button className="btn btn-outline-dark" onClick={getStudents}>Show Students</button>
                {showing.students?
                    <div>
                    <p>Students:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope = "col">id</th>
                                <th scope="col">User id</th>
                                <th scope="col">ClassRoom name</th>
                                <th scope="col">User name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsList.map((student, index) => (
                                <tr key = {index}>
                                    <th scope="row">{index}</th>
                                    <td>{student._id}</td>
                                    <td>{student.userID}</td>
                                    <td>{student.classRoomName}</td>
                                    <td>{getStoredUserNameStudent(student.userID)}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div> : ""}
                

                <button className="btn btn-outline-dark" onClick={getClassRooms}>Show ClassRooms</button>
                {showing.classRooms? 
                    <div>
                    <p>ClassRooms:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope = "col">Class Room Name</th>
                                <th scope="col">Professor name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classRoomList.map((classRoom, index) => (
                                <tr className = "clickable-tr" key = {index} onClick = {() => {selectClassRoom(classRoom)}}>
                                    <th scope="row">{index}</th>
                                    <td>{classRoom.classRoomName}</td>
                                    <td>{(classRoom.proffesorID === undefined || classRoom.proffesorID === null)? "Professor not yet assigned" : getStoredUserNameProfessor(classRoom.proffesorID)}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    
                    <ReactangleDivider>
                        <input type="text" placeholder = "New Classroom Name" onChange = {(event) => {changenewClassRoomName(event.target.value)}}></input>
                        <button className="btn btn-outline-success" onClick={createClassRoom}>Create Class Room</button>
                    </ReactangleDivider>
                    </div>: ""}
                

                <button className="btn btn-outline-dark" onClick={() => changePage(1)}>Go back</button>
            </div>
            }
        </div>
    )
}