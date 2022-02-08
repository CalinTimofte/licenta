import React from "react";
import ValueTable from "../Exercise5/ValueTable.js";

export default function Exercise16(){

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <ValueTable
                        tableValues={[["Propositions", "Propositional formulae?"],
                         ["p1", "select"],
                         ["p1 ∨ q1", "select"],
                         ["(p1 ∨ q1)", "select"],
                         ["(¬p1 ∨ q1)", "select"],
                         ["((¬p1) ∨ q1)", "select"],
                         ["(¬p)", "select"],
                        ]}
                        selectValues = {["formula", "not formula"]}
                        checkAnswer={
                            (answerTruthValues, changeCompleteness) => {
                                if(answerTruthValues[0] === "formula")
                                    if(answerTruthValues[1] === "not formula")
                                        if(answerTruthValues[2] === "formula")
                                            if(answerTruthValues[3] === "formula")
                                                if(answerTruthValues[4] === "not formula")
                                                    if(answerTruthValues[5] === "not formula")
                                                        changeCompleteness("complete");
                                                    else
                                                        changeCompleteness("incomplete");
                                                else
                                                    changeCompleteness("incomplete");
                                            else
                                                changeCompleteness("incomplete");                                                        
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