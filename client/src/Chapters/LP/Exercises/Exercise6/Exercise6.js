import React from "react";
import ValueTable from "../Exercise5/ValueTable.js";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise6(){

    return(
        <>
        <GenericExercise envProp={"exercise5a"}>
            <ValueTable
                tableValues={[["2 + 2 = 4", "the Earth is flat", "If 2 + 2 = 4, then the Earth is flat"], ["select", "select", "select"]]}
                checkAnswer={
                    (answerTruthValues, changeCompleteness, finishExerciseCallback) => {
                        if(answerTruthValues[0] === "true")
                            if(answerTruthValues[1] === "false")
                                if(answerTruthValues[2] === "false"){
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
        <GenericExercise envProp={"exercise5b"}>
            <ValueTable
                tableValues={[["2 + 2 = 5", "the Earth is flat", "If 2 + 2 = 5, then the Earth is flat"], ["select", "select", "select"]]}
                checkAnswer={
                    (answerTruthValues, changeCompleteness, finishExerciseCallback) => {
                        if(answerTruthValues[0] === "false")
                            if(answerTruthValues[1] === "false")
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
        </>
    )
}