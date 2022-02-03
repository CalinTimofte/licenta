import React, {useState} from "react";

export default function RuleApplier(){
    let [currentContext, changeCurrentContext] = useState([{symbol: "p", type: "propositional variable"}])
    let [completedness, changeCompletedness] = useState("unattempted");

    let getText = () => {
        let returnStr = "";
        currentContext.forEach(element => {
            returnStr += element.symbol;
            returnStr += " ";
        });
        return returnStr;
    }

    let applyBaseCase = () => {
        if(currentContext.length === 1)
            if(currentContext[0].type === "propositional variable")
                changeCurrentContext([{symbol: "Base Case", type: "base case"}])
    }

    let checkIfDone = () => {
        let ok = 0;
        if(currentContext.length === 1)
            if(currentContext[0].type === "base case")
                ok = 1;
        if(ok === 1)
            changeCompletedness("complete");
        else
            changeCompletedness("incomplete");
    }

    return(
        <div>
            <div className="contexts">
                <div className="card">
                    <div className="context card-body bg-light">
                        {getText()}
                    </div>
                </div>
            </div>
            <div className="rules">
                <button className="btn btn-outline-dark" onClick={applyBaseCase}>Rule1</button>
                <button className="btn btn-outline-dark" onClick={checkIfDone}>Done</button>
            </div>
            <div className="finish-text">
                {completedness === "complete"? <p style = {{color: "green"}}>Congratulations!</p> :
                    completedness === "incomplete"? <p style = {{color: "red"}}>Try again!</p> : <p></p>}
            </div>
        </div>
    )
}