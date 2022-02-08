import React from "react";
import ValueTable from "../Exercise5/ValueTable.js";

export default function Exercise8(){

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <ValueTable
                        tableValues={[["The number 7 is odd", "7 is a prime", "The number 7 is odd if and only if 7 is a prime"], ["select", "select", "select"]]}
                        checkAnswer={
                            (answerTruthValues, changeCompleteness) => {
                                if(answerTruthValues[0] === "true")
                                    if(answerTruthValues[1] === "true")
                                        if(answerTruthValues[2] === "true")
                                            changeCompleteness("complete");
                                        else
                                            changeCompleteness("incomplete");
                                    else
                                        changeCompleteness("incomplete");
                                else
                                    changeCompleteness("incomplete");
                        
                        }}
                    />
                </div>
            </div>
        </div>
    )
}