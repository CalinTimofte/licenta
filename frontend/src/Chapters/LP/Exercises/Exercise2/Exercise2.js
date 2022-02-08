import React from "react";
import SentenceCreator from "./SentenceCreator";

export default function Exercise2(){
    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <SentenceCreator operations={[{name: "and", symbol: "∧"}]}/>
                </div>
            </div>
        </div>
    )
}