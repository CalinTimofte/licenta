import React, {useState} from "react";

import AtomicProp from "../../../../Reusables/LogicCheking/LP/AtomicProp";

export default function Exercise2(){
    let [currentSentence, changeCurrentSentence] = useState("");
    let [formalSentence, changeFormalSentence] = useState([])

    function addToSentence(word){
        changeCurrentSentence(currentSentence => (currentSentence + " " + word));
        switch(word){
            case "p":
                changeFormalSentence(formalSentence => [...formalSentence, new AtomicProp("p", true)])
            case "q":
                changeFormalSentence(formalSentence => [...formalSentence, new AtomicProp("q", false)])
            case "∧":
                changeFormalSentence(formalSentence => [...formalSentence, "and"])
            default:
                changeFormalSentence(formalSentence => [...formalSentence, word])
        }
    }

    let buttonWordFunctionGenerator = (word) => (() => addToSentence(word))

    function deleteSentence(word){
        changeCurrentSentence("")
    }

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <div>
                        <button onClick={buttonWordFunctionGenerator("p")}>p</button>
                        <button onClick={buttonWordFunctionGenerator("q")}>q</button>
                        <button onClick={buttonWordFunctionGenerator("∧")}>and</button>
                    </div>

                    <div>{currentSentence}</div>
                </div>
            </div>
        </div>
    )
}