import React, {useState} from "react";

import AtomicProp from "../../../../Reusables/LogicCheking/LP/AtomicProp";
import computeTruthValue from "../../../../Reusables/LogicCheking/LP/Parser";

let defaultGoalText = (exercisePart) => (
    <div>
        {exercisePart === 0?
            "Please enter a false sentence":
            exercisePart === 1?
                "Please enter a true sentence":
                "Exercise finished!"}
    </div>
)

let defaultGoalHandler = (currentTruthValue, exercisePart, changeExercisePart, currentState) => {
    switch(exercisePart){
        case 0:
            if(currentTruthValue === false)
                changeExercisePart(1);
            break;
        case 1:
            if(currentTruthValue === true)
                changeExercisePart(2);
            break; 
        default:
    }
}

export default function SentenceCreator({operations, goalText = defaultGoalText, goalHandler = defaultGoalHandler}){
    let [currentSentence, changeCurrentSentence] = useState("");
    let [formalSentence, changeFormalSentence] = useState([]);
    let [truthValue, changeTruthValue] = useState(undefined);
    let [exercisePart, changeExercisePart] = useState(0);

    function addToSentence(word){
        changeCurrentSentence(currentSentence => (currentSentence + " " + word));
        if (word === "p")
            changeFormalSentence(formalSentence => [...formalSentence, new AtomicProp("p", true)])
        else if (word === "q")
            changeFormalSentence(formalSentence => [...formalSentence, new AtomicProp("q", false)])
        else
            // This way makes the exercise reusable with different operations
            for(let i = 0; i < operations.length; i++)
                if(operations[i].symbol === word)
                    changeFormalSentence(formalSentence => [...formalSentence, operations[i].name])
    }

    let buttonWordFunctionGenerator = (word) => (() => addToSentence(word))

    function deleteSentence(){
        changeCurrentSentence("");
        changeFormalSentence([]);
        changeTruthValue(undefined);
    }

    function backspace(){
        changeCurrentSentence(currentSentence => currentSentence.slice(0, -2));
        changeFormalSentence(formalSentence => formalSentence.slice(0, formalSentence.length-1))
    }

    let checkAction = () => {
        try{
            let truthValue = computeTruthValue(formalSentence);
            changeTruthValue(truthValue);
            // Makes the goals flexible
            // Needs current state for more complicated checks
            goalHandler(truthValue, exercisePart, changeExercisePart, formalSentence);
        }
        catch(e){
            throw(e)
        }
    }

    return(
        <div>
            <div style= {{color: "green"}}>p is always true</div>
            <div style= {{color: "red"}}>q is always false</div>
            {/* Changable goaltext for reusability */}
            {goalText(exercisePart)}
            <div>
                <button type="button" className="btn btn-outline-dark" onClick={buttonWordFunctionGenerator("p")}>p</button>
                <button type="button" className="btn btn-outline-dark" onClick={buttonWordFunctionGenerator("q")}>q</button>
                {/* Map the operations from param */}
                {operations.map((operation, index) => (
                    <button type="button" className="btn btn-outline-dark" key={index} onClick={buttonWordFunctionGenerator(operation.symbol)}>{operation.name}</button>
                ))}
                <button type="button" className="btn btn-outline-dark" onClick={deleteSentence}>Delete</button>
                <button type="button" className="btn btn-outline-dark" onClick = {backspace}>Backspace</button>
                <button type="button" className="btn btn-outline-dark" onClick={checkAction}>Done</button>
            </div>

            <div>{currentSentence}</div>
            <div>{truthValue === true? 
                        "Sentence is true!" : 
                        truthValue === false? 
                            "Sentence is false!" : 
                            truthValue === undefined? 
                                "" :
                                truthValue}</div>
        </div>
    )
}