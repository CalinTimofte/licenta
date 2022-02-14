import React from "react";

import SentenceCreator from "../Exercise2/SentenceCreator.js";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise7(){
    return(
        <GenericExercise envProp={"exercise7"}>
            <SentenceCreator 
                operations={[{name: "and", symbol: "∧"}, {name: "not", symbol: "¬"}]}
                goalText={
                    (exercisePart) => (
                            <div>
                                {exercisePart === 0?
                                    "Please enter a false sentence that contains both a negation and a conjunction":
                                    "Exercise finished!"}
                            </div>
                        )
                }
                goalHandler={
                    (currentTruthValue, exercisePart, changeExercisePart, currentState, finishExerciseCallback) => {
                        switch(exercisePart){
                            case 0:
                                if(currentTruthValue === false && (currentState.includes("not") && currentState.includes("and"))){
                                    changeExercisePart(1);
                                    finishExerciseCallback();
                                }
                                break;
                            default:
                        }
                    }
                }
            />
        </GenericExercise>
    )
}