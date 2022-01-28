import React, {useState} from "react";

export default function TruthTable(){

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
                        <th scope="col">φ</th>
                        <th scope="col">ψ</th>
                        <th scope="col">φ ∨ ψ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>false</td>
                        <td>false</td>
                        <td>
                            {selectFactory(0)}
                        </td>
                    </tr>
                    <tr>
                        <td>false</td>
                        <td>true</td>
                        <td>
                            {selectFactory(1)}
                        </td>
                    </tr>
                    <tr>
                        <td>true</td>
                        <td>false</td>
                        <td>
                            {selectFactory(2)}
                        </td>
                    </tr>
                    <tr>
                        <td>true</td>
                        <td>true</td>
                        <td>
                            {selectFactory(3)} 
                        </td>
                    </tr>
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