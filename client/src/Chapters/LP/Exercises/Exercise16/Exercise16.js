import React from "react";
import ValueTable from "../Exercise5/ValueTable.js";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise16(){

    return(
        <GenericExercise envProp={"exercise16"}>
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
                    (answerTruthValues, changeCompleteness, finishExerciseCallback) => {
                        if(answerTruthValues[0] === "formula")
                            if(answerTruthValues[1] === "not formula")
                                if(answerTruthValues[2] === "formula")
                                    if(answerTruthValues[3] === "formula")
                                        if(answerTruthValues[4] === "not formula")
                                            if(answerTruthValues[5] === "not formula"){
                                                changeCompleteness("complete");
                                                finishExerciseCallback();
                                            }
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
        </GenericExercise>
    )
}