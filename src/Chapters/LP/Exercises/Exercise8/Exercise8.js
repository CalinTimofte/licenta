import React from "react";
import TruthTable from "../Exercise5/TruthTable.js";

export default function Exercise8(){

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <TruthTable
                        tableValues={[["The number 7 is odd", "7 is a prime", "The number 7 is odd if and only if 7 is a prime"], ["true", "true", "select"]]}
                        checkAnswer={
                            (answerTruthValues, changeCompleteness) => {
                                if(answerTruthValues[0] === "true")
                                    changeCompleteness("complete");
                                else
                                    changeCompleteness("incomplete");
                        
                        }}
                    />
                </div>
            </div>
        </div>
    )
}