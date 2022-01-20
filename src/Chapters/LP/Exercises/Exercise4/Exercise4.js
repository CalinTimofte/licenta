import React from "react";

import SentenceCreator from "../Exercise2/SentenceCreator.js";

export default function Exercise2(){
    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <SentenceCreator operations={[{name: "or", symbol: "∨"}]}/>
                </div>
            </div>
        </div>
    )
}