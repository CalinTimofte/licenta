import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function FileUploadAndViewer({exerciseNumber}){
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

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

    const handleClose = () => setShow(false);
    const handleShow = () => {
        axiosHttp.post("/getFile", {
            exerciseNumber : exerciseNumber,
        })
        .then(
        (response) => {setSelectedFile(arrayBufferToBase64(response.data.fileData.data))},
        (error) => {
            let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
            console.log(error); 
            window.alert(message);}
        )
        .then(() => {setShow(true);})
    }

    return (
        
        <div>
            <p>Upload a solution (jpeg or png), or see current uploaded solution.</p>
            <p>If you upload a solution after you've already uploaded, your old solution will be overwritten.</p>
            <p>Please wait a few seconds after upload for the changes to take effect</p>
            <div>
                <form action="http://localhost:3001/fileUpload" method="POST" encType="multipart/form-data">
                    <input type="hidden" name = "exerciseNumber" value = {exerciseNumber}/>
                    <input type="file" className="form-control" name="solution"/>
                    <div>
                        <button className="btn btn-outline-dark" type="submit">Submit</button>
                    </div>
                </form>
		    </div>

            <button className= "btn btn-outline-dark" onClick={handleShow}>See submitted solution</button>

            <Modal show={show} onHide={handleClose} centered = {true} size = {"xl"}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src = {!selectedFile? "#" : `data:image/jpeg;base64, ${selectedFile}`} className="img-fluid"/></Modal.Body>
                <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}