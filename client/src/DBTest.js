import React from "react";
import axios from "axios";

export default function DBTest(){

    let http = axios.create({
        baseURL: "http://localhost:3001",
        headers:{
            "Content-type": "application/json"
        }
    })

    let createJohn = () => {
        http.get("/testUser")
    }

    return(
        <div>
            <button className="btn btn-outline-dark" onClick={createJohn}>Add John Doe</button>
        </div>
    )
}