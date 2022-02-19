import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

export default function ProfessorPannel({changePage}){

    let axiosHttp = axios.create({
        baseURL: "http://localhost:3001",
        headers:{
            "Content-type": "application/json"
        }
    })

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));    
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const [show, setShow] = useState(false);
    const [files, setFiles] = useState("init");
    let [professorData, setProfessorData] = useState("init");
    let [userList, setUserList] = useState([]);
    let [seeStudents, setSeeStudents] = useState(0);
    let [selectedUser, setSelectedUser] = useState({selected: false})
    let [selectedFile, setSelectedFile] = useState();

    let selectUser = (data) => {setSelectedUser({selected: true, data: data})}
    let resetSelection = () => {setSelectedUser({selected: false})};

    let getUsers = (students) => {
        students.forEach(student => {
            axiosHttp.post("/getStudentUserFromProfessor", {
                userID: student.userID
            })
            .then((res) => {setUserList(oldUserList => ([...oldUserList, res.data.userName]))}, 
            (error) => {
                let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
                console.log(error); window.alert(message);
            }
            )
            .then(setSeeStudents(1));
        });
    }

    useEffect(() => {
        axiosHttp.get('/getProfessorData')
        .then((response) => {
            setProfessorData(response.data);
            let studentUserIDList = response.data.students.map(student => student.userID)
            axiosHttp.post("/getProfessorDataStudents", {
                studentUserIDList: studentUserIDList
            })
                        .then((response) => {setUserList(response.data);})
                        .catch((error) => {console.log(error)})
        },
        (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let findUserLocal = (studentUserID) => (userList.users.filter(user => user._id === studentUserID)[0])

    let handleClose = () => {
        setSelectedFile("");
        setShow(false);
    };
    
    const handleShow = (file) => {
        setSelectedFile(arrayBufferToBase64(file.data.data));
        setShow(true);
    }

    let getStudentWithFiles = (student) => {
        axiosHttp.post("/getStudentFiles", {
            studentID: student
        })
        .then((response) => {
            console.log(response.data);
            setFiles(response.data.files);
            selectUser({student: student, userName: findUserLocal(student.userID).userName})
        },
        (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); window.alert(message);
        })
    }

    return (
        <div>
            <p>Professor content</p>
            {professorData === "init"? "" :

            (professorData.classRoomName === "No class Room"? <p>No classRoom assigned yet</p> : 
                (selectedUser.selected? 
                    files === "init"? "" :
                <div>
                    <p>User Name: {selectedUser.data.userName}</p>

                    <div>
                        <p>Files:</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope = "col">Exercise number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file, index) => (
                                    <tr className = "clickable-tr" key = {index} onClick = {() => {handleShow(file)}}>
                                        <th scope="row">{index}</th>
                                        <td>{file.exerciseNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                            <Modal show={show} onHide={handleClose} centered = {true} size = {"xl"}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Solution:</Modal.Title>
                                </Modal.Header>
                                    <Modal.Body><img src = {!selectedFile? "#" : `data:image/jpeg;base64, ${selectedFile}`} className="img-fluid"/></Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                                </Modal.Footer>
                            </Modal>
                    </div>

                    <button className="btn btn-outline-dark" onClick={resetSelection}>Go Back to users list</button>
                </div>
                    : 
                <div>
                    <p>ClassRoom: {professorData.classRoomName}</p>

                    <button className="btn btn-outline-dark" onClick={() => {setSeeStudents(1)}}>See Students</button>
                    {seeStudents === 1?
                    <div>
                        <p>Students:</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope = "col">id</th>
                                    <th scope="col">User id</th>
                                    <th scope="col">User name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professorData.students.map((student, index) => (
                                    <tr className = "clickable-tr" key = {index} onClick = {() => {getStudentWithFiles(student)}}>
                                        <th scope="row">{index}</th>
                                        <td>{student._id}</td>
                                        <td>{student.userID}</td>
                                        <td>{findUserLocal(student.userID).userName}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                    </div> : ""}
                </div>)
            )
            
            }
            <button className="btn btn-outline-dark" onClick={() => changePage(1)}>Go back to main page</button>
        </div>
    )
}