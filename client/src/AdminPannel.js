import React, {useState} from "react";
import ReactangleDivider from "./Reusables/RectangleDivider";
import axios from "axios";

export default function AdminPannel({changePage}){
    let [usersList, changeUsersList] = useState([]);
    let [professorList, chagneProfessorList] = useState([]);
    let [studentsList, changeStudentsList] = useState([]);
    let [classRoomList, changeClassRoomList] = useState([]);
    let [showing, changeShowing] = useState({users: false, students: false, classRooms: false})
    let [selectedField, setSelectedField] = useState({selected: false})

    let [selectedProfessorID, changeSelectedProfessorID] = useState();

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
                .catch((error) => {console.log(error)});
    }

    let getStudents = () => {
        axiosHttp.get("/getAllStudents")
                .then((response) => {changeStudentsList(response.data); showStudents()})
                .catch((error) => {console.log(error)});
    }

    let getClassRooms = () => {
        axiosHttp.get("/getAllClassRooms")
                .then((response) => {changeClassRoomList(response.data); showClassRooms()})
                    .then(() => 
                        {(axiosHttp.get("/getAllProfessors")
                        .then((response) => {chagneProfessorList(response.data); changeSelectedProfessorID(response.data[0]._id);})
                        .catch((error) => {console.log(error)}))}
                        )
                .catch((error) => {console.log(error)});
    }

    let resetSelectedField = () => {setSelectedField({selected: false})};

    let selectClassRoom = (data) => {
        setSelectedField({
            selected: true,
            type: "classRoom",
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
            console.log(error); window.alert(message);
        })
    }

    let getUserName = (userID) => {
        axiosHttp.post("/getUserName", {
            userID: userID
        })
        .then((response)  => {return response.data.userName})
        .catch((error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        })
    }

    let getStoredUserName = (prof_ID) => {
        let name_in_arr = professorList.filter(professor => professor._id === prof_ID);
        if (name_in_arr.length === 0)
            return "";
        else
            return(name_in_arr[0].userName)
    }


    return (
        <div>
            <p>Admin content</p>

            {selectedField.selected? 
             (
                 selectedField.type === "classRoom" ? 
                    <div class = "admin-classroom">
                        <ReactangleDivider>
                            <p>Classroom : {selectedField.data.classRoomName}</p>
                            <p>Proffessor : {selectedField.data.proffesorID === undefined? "Professor not yet assigned" : getStoredUserName(selectedField.data.proffesorID)}</p>
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

                        <button className="btn btn-outline-dark" onClick={resetSelectedField}>Go back</button>
                    </div>:
                    ""
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
                            {usersList.map((john, index) => (
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
                                    <td>{classRoom.proffesorID === undefined? "Professor not yet assigned" : getStoredUserName(classRoom.proffesorID)}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>: ""}
                

                <button className="btn btn-outline-dark" onClick={() => changePage(1)}>Go back</button>
            </div>
            }
        </div>
    )
}