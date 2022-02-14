import React from "react";
import ValueTable from "../Exercise5/ValueTable.js";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise8(){

    return(
        <GenericExercise envProp={"exercise8"}>
            <ValueTable
                tableValues={[["The number 7 is odd", "7 is a prime", "The number 7 is odd if and only if 7 is a prime"], ["select", "select", "select"]]}
                checkAnswer={
                    (answerTruthValues, changeCompleteness, finishExerciseCallback) => {
                        if(answerTruthValues[0] === "true")
                            if(answerTruthValues[1] === "true")
                                if(answerTruthValues[2] === "true"){
                                    changeCompleteness("complete");
                                    finishExerciseCallback();
                                }
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