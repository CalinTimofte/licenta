import React, {useState} from "react";

import AtomicProp from "../../../../Reusables/LogicCheking/LP/AtomicProp";
import computeTruthValue from "../../../../Reusables/LogicCheking/LP/Parser";

export default function Exercise2(){
    let [currentSentence, changeCurrentSentence] = useState("");
    let [formalSentence, changeFormalSentence] = useState([]);
    let [truthValue, changeTruthValue] = useState(undefined);

    function addToSentence(word){
        changeCurrentSentence(currentSentence => (currentSentence + " " + word));
        switch(word){
            case "p":
                changeFormalSentence(formalSentence => [...formalSentence, new AtomicProp("p", true)])
                break;
            case "q":
                changeFormalSentence(formalSentence => [...formalSentence, new AtomicProp("q", false)])
                break;
            case "∧":
                changeFormalSentence(formalSentence => [...formalSentence, "and"])
                break;
            default:
                changeFormalSentence(formalSentence => [...formalSentence, word])
        }
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
        changeTruthValue(computeTruthValue(formalSentence));
        }
        catch(e){
            changeTruthValue(e)
        }
    }

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <div style= {{color: "green"}}>p is always true</div>
                    <div style= {{color: "red"}}>q is always false</div>
                    <div>
                        <button onClick={buttonWordFunctionGenerator("p")}>p</button>
                        <button onClick={buttonWordFunctionGenerator("q")}>q</button>
                        <button onClick={buttonWordFunctionGenerator("∧")}>and</button>
                        <button onClick={deleteSentence}>Delete</button>
                        <button onClick = {backspace}>Backspace</button>
                        <button onClick={checkAction}>Done</button>
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
            </div>
        </div>
    )
}