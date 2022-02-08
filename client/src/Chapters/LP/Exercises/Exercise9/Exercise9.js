import React from "react";
import ValueTable from "../Exercise5/ValueTable.js";

export default function Exercise9(){

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <ValueTable
                        tableValues={[
                            ["Sentence", "Value"], 
                            ["You own a laptop computer.", "select"],
                            ["Snow is white.", "select"],
                            ["Snow is not white.", "select"],
                            ["My father goes to work and I go to school.", "select"],
                            ["It is raining outside, but I have an umbrella.", "select"],
                            ["Either it will rain tomorrow, or it won’t rain.", "select"],
                            ["If I get a passing grade in Logic, I will celebrate.", "select"],
                            ["2 + 2 = 4. ( Two plus two is four.)", "select"],
                            ["Red and Black. (not a statement)", "select"],
                            ["π. (not a statement)", "select"],
                            ["Is it raining? (question)", "select"],
                            ["Let’s go fishing! (imperative)", "select"],
                            ["x is greater than 7. (cannot tell unless I know who x is)", "select"],
                            ["This sentence is false.", "select"],
                        ]}
                        checkAnswer={
                            (answerTruthValues, changeCompleteness) => {
                                if(answerTruthValues[0] === "atomic proposition")
                                    if(answerTruthValues[1] === "atomic proposition")
                                        if(answerTruthValues[2] === "molecular proposition - negation")
                                            if(answerTruthValues[3] === "molecular proposition - conjunction")
                                                if(answerTruthValues[4] === "molecular proposition - conjunction")
                                                    if(answerTruthValues[5] === "molecular proposition - disjunction")
                                                        if(answerTruthValues[6] === "molecular proposition - implication")
                                                            if(answerTruthValues[7] === "atomic proposition")
                                                                if(answerTruthValues[8] === "not proposition")
                                                                    if(answerTruthValues[9] === "not proposition")
                                                                        if(answerTruthValues[10] === "not proposition")
                                                                            if(answerTruthValues[11] === "not proposition")
                                                                                if(answerTruthValues[12] === "not proposition")
                                                                                    if(answerTruthValues[13] === "not proposition")
                                                                                        changeCompleteness("complete");
                                                                                    else
                                                                                        changeCompleteness("incomplete");
                                                                                else
                                                                                    changeCompleteness("incomplete");
                                                                            else
                                                                                changeCompleteness("incomplete");
                                                                        else
                                                                            changeCompleteness("incomplete");
                                                                    else
                                                                        changeCompleteness("incomplete");
                                                                else
                                                                    changeCompleteness("incomplete");
                                                            else
                                                                changeCompleteness("incomplete");
                                                        else
                                                            changeCompleteness("incomplete");
                                                    else
                                                        changeCompleteness("incomplete");
                                                else
                                                    changeCompleteness("incomplete");
                                            else
                                                changeCompleteness("incomplete");
                                        else
                                            changeCompleteness("incomplete");
                                    else
                                        changeCompleteness("incomplete");
                                else
                                    changeCompleteness("incomplete");
                        
                        }}
                        selectValues = {["not proposition", "atomic proposition", "molecular proposition - conjunction", "molecular proposition - disjunction", "molecular proposition - negation", "molecular proposition - implication", "molecular proposition - equivalence"]}
                    />
                </div>
            </div>
        </div>
    )
}