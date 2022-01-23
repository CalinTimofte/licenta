import React from "react";

import SentenceCreator from "../Exercise2/SentenceCreator.js";

export default function Exercise17(){
    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <SentenceCreator operations={[{name: "and", symbol: "∧"}, {name: "or", symbol: "∨"}, {name: "not", symbol: "¬"}, {name: "implication", symbol: "🠒"}, {name: "equivalence", symbol: "⟷"}]}/>
                </div>
            </div>
        </div>
    )
}