import React from "react";
import TruthTable from "../Exercise5/TruthTable.js";

export default function Exercise6(){

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <TruthTable
                        tableValues={[["2 + 2 = 4", "the Earth is flat", "If 2 + 2 = 4, then the Earth is flat"], ["true", "false", "select"]]}
                        checkAnswer={
                            (answerTruthValues, changeCompleteness) => {
                                if(answerTruthValues[0] === "false")
                                    changeCompleteness("complete");
                                else
                                    changeCompleteness("incomplete");
                        
                        }}
                    />
                    <TruthTable
                        tableValues={[["2 + 2 = 5", "the Earth is flat", "If 2 + 2 = 4, then the Earth is flat"], ["false", "false", "select"]]}
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