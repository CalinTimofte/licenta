import React from "react";

import SentenceCreator from "../Exercise2/SentenceCreator.js";

export default function Exercise17(){
    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <SentenceCreator 
                    operations={[{name: "and", symbol: "∧"}, {name: "or", symbol: "∨"}, {name: "not", symbol: "¬"}, {name: "implication", symbol: "🠒"}, {name: "equivalence", symbol: "⟷"}]}
                    goalText={
                        (exercisePart) => (
                                <div>
                                    {exercisePart === 0?
                                        "Please enter a sentence with at least 4 variables (1/5)":
                                        exercisePart === 1?
                                        "Please enter a sentence with at least 4 variables (2/5)":
                                            exercisePart === 2?
                                            "Please enter a sentence with at least 4 variables (3/5)":
                                                exercisePart === 3?
                                                "Please enter a sentence with at least 4 variables (4/5)":
                                                    exercisePart === 4?
                                                    "Please enter a sentence with at least 4 variables (5/5)":
                                                    "Exercise finished!"
                                    }
                                </div>
                            )
                    }
                    goalHandler={
                        (currentTruthValue, exercisePart, changeExercisePart, currentState) => {
                            if(exercisePart !== 5){
                                if(currentState.length >= 7)
                                    changeExercisePart(exercisePart + 1);
                            }
                        }
                    }
                    />
                </div>
            </div>
        </div>
    )
}