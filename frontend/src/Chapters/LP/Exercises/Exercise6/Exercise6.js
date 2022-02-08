import React from "react";
import ValueTable from "../Exercise5/ValueTable.js";

export default function Exercise6(){

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <ValueTable
                        tableValues={[["2 + 2 = 4", "the Earth is flat", "If 2 + 2 = 4, then the Earth is flat"], ["select", "select", "select"]]}
                        checkAnswer={
                            (answerTruthValues, changeCompleteness) => {
                                if(answerTruthValues[0] === "true")
                                    if(answerTruthValues[1] === "false")
                                        if(answerTruthValues[2] === "false")
                                            changeCompleteness("complete");
                                        else
                                            changeCompleteness("incomplete");
                                    else
                                        changeCompleteness("incomplete");
                                else
                                    changeCompleteness("incomplete");
                        
                        }}
                    />
                    <ValueTable
                        tableValues={[["2 + 2 = 5", "the Earth is flat", "If 2 + 2 = 5, then the Earth is flat"], ["select", "select", "select"]]}
                        checkAnswer={
                            (answerTruthValues, changeCompleteness) => {
                                if(answerTruthValues[0] === "false")
                                    if(answerTruthValues[1] === "false")
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