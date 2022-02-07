import React, {useState, useContext} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {LocalStorageContext} from "../../../../LocalStorageContext.js"

export default function FileUploadAndViewer(){
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [fileURL, setfileURL] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {storeSolution, getSolutionByExerciseNumber} = useContext(LocalStorageContext);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        var URL = window.URL || window.webkitURL;
        setfileURL(URL.createObjectURL(event.target.files[0]));
	};


	const handleSubmission = () => {
        if(isFilePicked)
            storeSolution(15, selectedFile);
	};

    return (
        
        <div>
            <p>Upload a solution, or see current uploaded solution</p>
            <div>
                <input type="file" className="form-control" name="file" onChange={changeHandler}/>
                <div>
                    <button className="btn btn-outline-dark" onClick={handleSubmission}>Submit</button>
                </div>
		    </div>

            <Button variant="outline-dark" onClick={handleShow}>
                See submitted solution
            </Button>

            <Modal show={show} onHide={handleClose} centered = {true} size = {"xl"}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src = {fileURL} className="img-fluid"/></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}