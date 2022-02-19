import React, {useState} from "react";
import ReactangleDivider from "../../../../Reusables/RectangleDivider";

class PropositionalVariablePart{
    constructor(symbol){
        this._symbol = symbol;
    }

    get symbol(){
        return this._symbol;
    }
}

class BaseCase extends PropositionalVariablePart{
    constructor(){
        super("Base Case")
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
    constructor(contexts, title){
        this._contexts = contexts;
        this._title = title;
    }

    get contexts(){
        return this._contexts;
    }

    set contexts(newcontexts){
        this._contexts = newcontexts;
    }

    get title(){
        return this._title;
    }
}
 
export default function RuleApplier({isLoggedIn, isEnvPropSetArr,setEnvPropArr}){
    // array of tabs = array of contexts = array of objects -> propositional variable, negation, conjunction, disjunction 
    let [tabs, changeTabs] = useState([ new Tab([ new Context([new Negation(), new PropositionalVariable("q")]) ], "1"),
                                        new Tab([ new Context([new Brackets([new PropositionalVariable("p1"), new Conjunction(), new PropositionalVariable("q")])])], "2"),
                                        new Tab([ new Context([new Negation(), new Brackets([new PropositionalVariable("p"), new Disjunction(), new PropositionalVariable("q")])])], "3"),
                                        new Tab([ new Context([new Brackets([new Negation(), new PropositionalVariable("p"), new Disjunction(), new Negation(), new PropositionalVariable("q")])])], "4"),
                                        new Tab([ new Context([new Negation(), new Brackets([new Negation(), new PropositionalVariable("p"), new Disjunction(), new Brackets([new PropositionalVariable("q"), new Conjunction(), new Negation(), new PropositionalVariable("q")])])])], "5")
                                        ])
    let [currentTabIndex, changecurrentTabIndex] = useState(0);
    let [currentContextIndex, changeCurrentContextIndex] = useState(0);
    let [completedness, changeCompletedness] = useState(tabs.map((tab, index) => (isLoggedIn()? (isEnvPropSetArr(index)? "complete" : "unattempted"): "unattempted")));

    let getCurrentTab = () => tabs[currentTabIndex].contexts;

    let getCurrentContext = () => getCurrentTab()[currentContextIndex].content;

    let setCurrentTab = (changedTab) => {
        changeTabs(tabs => [...tabs.slice(0, currentTabIndex), new Tab(changedTab, tabs[currentTabIndex].title), ...tabs.slice(currentTabIndex + 1)]);
    }

    let setcurrentContext = (changedContext) => {
        setCurrentTab([...getCurrentTab().slice(0, currentContextIndex), new Context(changedContext), ...getCurrentTab().slice(currentContextIndex + 1)]);
    } 

    let splitCurrentContext = (contextPiece1, contextPiece2) => {
        setCurrentTab([...getCurrentTab().slice(0, currentContextIndex), new Context(contextPiece1), new Context(contextPiece2), ...getCurrentTab().slice(currentContextIndex + 1)]);
    }

    let setCompletedNess = (changedCompletedness) => {
        changeCompletedness(completedness => [...completedness.slice(0, currentTabIndex), changedCompletedness, ...completedness.slice(currentTabIndex + 1)]);
    }

    let switchContext = (index) => {changeCurrentContextIndex(index);}

    let switchTab = (index) => {changecurrentTabIndex(index);}

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
            if(getCurrentContext()[0] instanceof PropositionalVariable)
                setcurrentContext([new BaseCase()])
    }

    let applyInductiveStep1 = () => {
        if(getCurrentContext()[0] instanceof Negation)
            setcurrentContext(getCurrentContext().slice(1));
    }

    let applyInductiveStep2 = () => {
        if(getCurrentContext()[0] instanceof Brackets){
            let andIndex = getCurrentContext()[0].content.findIndex(element => {if (element instanceof Conjunction)
                                                                                     return true
                                                                                    else return undefined});
            if(andIndex !== -1)
                splitCurrentContext(getCurrentContext()[0].content.slice(0, andIndex), getCurrentContext()[0].content.slice(andIndex + 1));
        }
    }

    let applyInductiveStep3 = () => {
        if(getCurrentContext()[0] instanceof Brackets){
            let orIndex = getCurrentContext()[0].content.findIndex(element => {if (element instanceof Disjunction)
                                                                                     return true
                                                                                    else return undefined});
            if(orIndex !== -1)
                splitCurrentContext(getCurrentContext()[0].content.slice(0, orIndex), getCurrentContext()[0].content.slice(orIndex + 1));
        }
    }

    let checkIfDone = () => {
        let ok = 1;
        getCurrentTab().forEach(context => {
        if(context.content.length !== 1)
            ok = 0;
        if(!(context.content[0] instanceof BaseCase))
            ok = 0;
        })
        if(ok === 1){
            setCompletedNess("complete");
            setEnvPropArr(currentTabIndex);
        }
        else
            setCompletedNess("incomplete");
    }

    return(
        <div>
            <ReactangleDivider>
                <p>
                    Click on the tabs on top to select a sub-exercise. Click on one of the rectangles in display to select a goal to focuse on. Once selected, you can use the buttons labeled "Actions" to apply rules on the goal. Click done when you are finished.
                </p>
            </ReactangleDivider>
            <div>
                <ul className="nav nav-tabs">
                    {tabs.map((tab, index) => (
                        <li className="nav-item">
                            <button onClick={() => switchTab(index)} className={index === currentTabIndex? "nav-link active" : "nav-link"} href="#">{tab.title}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="current-tab">
                {getCurrentTab().map((context, index) => (
                    <div className="card" key = {index} style = {index === currentContextIndex? {border: "medium solid blue", marginBottom: "1em"}: {marginBottom: "1em"}}>
                        <button className="context card-body btn btn-outline-dark" style={{width: "100%"}}
                            data-bs-toggle="tooltip" data-bs-placement="top" title="Click to switch context"
                            onClick={() => switchContext(index)}
                        >
                            {getText(context.content)}
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
                {completedness[currentTabIndex] === "complete"? <p style = {{color: "green"}}>Congratulations!</p> :
                    completedness[currentTabIndex] === "incomplete"? <p style = {{color: "red"}}>Try again!</p> : <p></p>}
            </div>
        </div>
    )
}