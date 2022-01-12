import React, {useState} from "react";

export default function Exercise2(){
    let [currentSentence, changeCurrentSentence] = useState("");

    function addToSentence(word){
        changeCurrentSentence(currentSentence => (currentSentence + " " + word));
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