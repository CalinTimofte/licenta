import React from "react";

export default function TextBox({text}){
    return(
        <>
            <div className = "card">
                <div className = "card-body">
                    {text}
                </div>
            </div>
        </>
    )
}