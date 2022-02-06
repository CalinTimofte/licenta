import React, {useState} from "react";

class PropositionalVariablePart{
    constructor(symbol){
        this._symbol = symbol;
    }

    get symbol(){
        return this._symbol;
    }
}

class PropositionalVariable extends PropositionalVariablePart{}

class Negation extends PropositionalVariablePart{
    constructor(){
        super("¬")
    }
}

class Conjunction extends PropositionalVariablePart{
    constructor(){
        super("∧")
    }
}

class Disjunction extends PropositionalVariablePart{
    constructor(){
        super("∨")
    }
}

class Brackets extends PropositionalVariablePart{
    constructor(content){
        super("()");
        this._content = content; 
    }

    get content(){
        return this._content;
    }
}

class Context{
    constructor(content){
        this._content = content; 
    }

    get content(){
        return this._content;
    }

    set content(newContent){
        this._content = newContent;
    }
}

class Tab{
    constructor(contexts){
        this._contexts = contexts; 
    }

    get contexts(){
        return this._contexts;
    }

    set contexts(newcontexts){
        this._contexts = newcontexts;
    }
}
export default function RuleApplier(){
    // array of tabs = array of contexts = array of objects -> propositional variable, negation, conjunction, disjunction 
    let [tabs, changeTabs] = useState([[[new Brackets([new Negation(), new PropositionalVariable("p1"), new Disjunction(), new Negation(), new PropositionalVariable("q")])]]])
    let [currentTabIndex, changecurrentTabIndex] = useState(0);
    let [currentContextIndex, changeCurrentContextIndex] = useState(0);
    let [completedness, changeCompletedness] = useState("unattempted");

    let getCurrentTab = () => tabs[currentTabIndex];

    let getCurrentContext = () => getCurrentTab()[currentContextIndex];

    let changeContexts = (changedContexts) => {
        changeTabs(tabs => [...tabs.slice(0, currentTabIndex), changedContexts, ...tabs.slice(currentTabIndex + 1)]);
    }

    let setcurrentContext = (changedContext) => {
        changeContexts([...getCurrentContext().slice(0, currentContextIndex), changedContext, ...getCurrentContext().slice(currentContextIndex + 1)]);
    } 

    let splitCurrentContext = (contextPiece1, contextPiece2) => {
        changeContexts([...getCurrentContext().slice(0, currentContextIndex), contextPiece1, contextPiece2, ...getCurrentContext().slice(currentContextIndex + 1)]);
    }

    let switchContext = (index) => {changeCurrentContextIndex(index);}

    let getText = (context) => {
        let returnStr = "";
        context.forEach(element => {
            if(element instanceof Brackets)
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
        getCurrentTab().forEach(context => {
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
                {getCurrentTab().map((context, index) => (
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