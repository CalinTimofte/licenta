import React from "react";

import SentenceCreator from "../Exercise2/SentenceCreator.js";

export default function Exercise7(){
    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
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
                            (currentTruthValue, exercisePart, changeExercisePart, currentState) => {
                                switch(exercisePart){
                                    case 0:
                                        if(currentTruthValue === false && (currentState.includes("not") && currentState.includes("and")))
                                            changeExercisePart(1);
                                        break;
                                    default:
                                }
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
}