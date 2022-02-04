import React, {useState} from "react";

export default function RuleApplier(){
    // Array of arrays of objects -> objects are the symbols, array of objects is one context, and then we jave multiple contexts
    let [contexts, changeContexts] = useState([[{symbol: "()", content: [{symbol: "¬", type: "negation"}, {symbol: "p1", type: "propositional variable"}, {symbol: "∨", type: "disjunction"}, {symbol: "¬", type: "negation"}, {symbol: "q", type: "propositional variable"}], type: "brackets"}]])
    let [currentContextIndex, changeCurrentContextIndex] = useState(0);
    let [completedness, changeCompletedness] = useState("unattempted");

    let getCurrentContext = () => contexts[currentContextIndex];

    let setcurrentContext = (changedContext) => {
        changeContexts(contexts => [...contexts.slice(0, currentContextIndex), changedContext, ...contexts.slice(currentContextIndex + 1)]);
    } 

    let splitCurrentContext = (contextPiece1, contextPiece2) => {
        changeContexts(contexts => [...contexts.slice(0, currentContextIndex), contextPiece1, contextPiece2, ...contexts.slice(currentContextIndex + 1)]);
    }

    let switchContext = (index) => {changeCurrentContextIndex(index);}

    let getText = (context) => {
        let returnStr = "";
        context.forEach(element => {
            if(element.type === "brackets")
                returnStr += "( " + getText(element.content) + " ) "; 
            else returnStr += element.symbol + " ";
        });
        return returnStr;
    }

    let applyBaseCase = () => {
        if(getCurrentContext().length === 1)
            if(getCurrentContext()[0].type === "propositional variable")
                setcurrentContext([{symbol: "Base Case", type: "base case"}])
    }

    let applyInductiveStep1 = () => {
        if(getCurrentContext()[0].type === "negation")
            setcurrentContext(getCurrentContext().slice(1))
    }

    let applyInductiveStep2 = () => {
        if(getCurrentContext()[0].type === "brackets"){
            let andIndex = getCurrentContext()[0].content.findIndex(element => {if (element.type === "conjunction")
                                                                                     return true
                                                                                    else return undefined});
            if(andIndex !== -1)
                splitCurrentContext(getCurrentContext()[0].content.slice(0, andIndex), getCurrentContext()[0].content.slice(andIndex + 1));
        }
    }

    let applyInductiveStep3 = () => {
        if(getCurrentContext()[0].type === "brackets"){
            let orIndex = getCurrentContext()[0].content.findIndex(element => {if (element.type === "disjunction")
                                                                                     return true
                                                                                    else return undefined});
            if(orIndex !== -1)
                splitCurrentContext(getCurrentContext()[0].content.slice(0, orIndex), getCurrentContext()[0].content.slice(orIndex + 1));
        }
    }

    let checkIfDone = () => {
        let ok = 1;
        contexts.forEach(context => {
        if(context.length !== 1)
            ok = 0;
        if(context[0].type !== "base case")
            ok = 0;  
        })
        if(ok === 1)
            changeCompletedness("complete");
        else
            changeCompletedness("incomplete");
    }

    return(
        <div>
            <div className="contexts">
                {contexts.map((context, index) => (
                    <div className="card" key = {index} style = {index === currentContextIndex? {border: "medium solid blue", marginBottom: "1em"}: {marginBottom: "1em"}}>
                        <button className="context card-body btn btn-outline-dark" style={{width: "100%"}}
                            data-bs-toggle="tooltip" data-bs-placement="top" title="Click to switch context"
                            onClick={() => switchContext(index)}
                        >
                            {getText(context)}
                        </button>
                    </div>
                ))}
            </div>
            <div className="rules">
                <p>Actions:</p>
                <button className="btn btn-outline-dark" onClick={applyBaseCase}>Base Case</button>
                <button className="btn btn-outline-dark" onClick={applyInductiveStep1}>Inductive step 1 (negation)</button>
                <button className="btn btn-outline-dark" onClick={applyInductiveStep2}>Inductive step 2 (conjunction)</button>
                <button className="btn btn-outline-dark" onClick={applyInductiveStep3}>Inductive step 3 (disjunction)</button>
                <button className="btn btn-outline-dark" onClick={checkIfDone}>Done</button>
            </div>
            <div className="finish-text">
                {completedness === "complete"? <p style = {{color: "green"}}>Congratulations!</p> :
                    completedness === "incomplete"? <p style = {{color: "red"}}>Try again!</p> : <p></p>}
            </div>
        </div>
    )
}