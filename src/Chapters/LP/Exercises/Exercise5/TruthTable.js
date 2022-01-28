import React, {useState} from "react";

let defaultTableValues = [["φ", "ψ", "φ ∨ ψ"], ["false", "false", "select"], ["false", "true", "select"], ["true", "false", "select"], ["true", "true", "select"]];

export default function TruthTable({tableValues = defaultTableValues}){

    let [answerTruthValues, changeAnswerTruthValues] = useState(["true", "true", "true", "true"]);
    let [completedness, changeCompleteness] = useState("unattempted");

    let selectFactory = (answerIndex) => (
        <select class="form-select" id="truth-values" name="truth-values"
            onChange={(e) => {
                let optionIndex = e.target.selectedIndex;
                changeAnswerTruthValues(answerTruthValues => {
                    let newAnswerTruthValues = [...answerTruthValues];
                    newAnswerTruthValues[answerIndex] = e.target.options[optionIndex].value;
                    return newAnswerTruthValues;
                });
            }}
        >
            <option value="true">true</option>
            <option value="false">false</option>
        </select> 
    );

    let checkAnswer = () => {
        if(answerTruthValues[0] === "false")
            if((answerTruthValues[1] === "true" && answerTruthValues[2] === "true") && answerTruthValues[3] === "true")
                changeCompleteness("complete");
            else
                changeCompleteness("incomplete");
        else
            changeCompleteness("incomplete");

    }

    return(
        <div>
            <table class="table">
                <thead>
                    <tr>
                        {tableValues[0].map((value, index) => (<th scope="col" key = {index}>{value}</th>))}
                    </tr>
                </thead>
                <tbody>
                        {tableValues.map((row, rowIndex) => {
                            if(rowIndex !== 0)
                                return (
                                    <tr>
                                        {row.map((value, index) => {
                                            if(value === "select")
                                                return (<td key = {index}>{selectFactory(rowIndex - 1)}</td>)
                                            else
                                                return (<td key = {index}>{value}</td>)
                                        })}
                                    </tr>
                                )
                            else return(<></>)
                        })}
                </tbody>
            </table>

            <button type="button" className="btn btn-outline-dark" onClick={checkAnswer}>Done</button>
            <span>
                {completedness === "complete"? <p style = {{color: "green"}}>Congratulations!</p> :
                    completedness === "incomplete"? <p style = {{color: "red"}}>Try again!</p> : <p></p>}
            </span>
        </div>
    )
}