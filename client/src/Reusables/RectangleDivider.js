import React from "react";

export default function ReactangleDivider({children}){
    return(
        <div className="rectangle-divider">
            <div className="card">
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
}