import React from "react";

export default function ProfessorPannel({changePage}){
    return (
        <div>
            <p>Professor content</p>
            <button className="btn btn-outline-dark" onClick={() => changePage(1)}>Go back</button>
        </div>
    )
}