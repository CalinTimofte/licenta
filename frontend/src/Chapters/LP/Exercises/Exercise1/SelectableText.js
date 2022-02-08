import React, {useState} from "react";

function SelectableWord({word, highlighted, inactive, hover}){
    let selectedStyle = {backgroundColor: "yellow"}
    let unselectedStytle = {}
    let inactiveStyle = {backgroundColor: "gray"}
    let inactiveStyleWithHover = {backgroundColor: "gray", color: "red"}

    return(
        <span style = {inactive? hover? inactiveStyleWithHover: inactiveStyle: highlighted? selectedStyle : unselectedStytle}>{word}</span>
    )
}

// function for reusability, goalchecker
function DefaultheckifFinished(words){
    if((words[0].partOf === words[1].partOf && words[2].partOf === words[3].partOf && words[1].partOf === words[2].partOf) &&
        (words[4].partType === "conjunction") &&
        (words[5].partOf === words[6].partOf && words[7].partOf === words[8].partOf &&  words[6].partOf === words[7].partOf) &&
        (words[0].partType === words[5].partType && words[5].partType === "prop"))
        return true;
    else
        return false;
}

// What buttons to use in the exercise - reusability
let defaultButtons = [{part: "prop", name: "Atomic Prop"}, {part: "conjunction", name: "Conjunction"}]


function SelectableText({inputWords, checkifFinished = DefaultheckifFinished, buttons = defaultButtons}){
    let [heighlightedText, changeHeighlightedText] = useState("");
    let [words, modifyWordsArr] = useState(inputWords.split(" ").map(word => ({word: word, heighlighted: false, partOfSomething: false, partOf: null, hovering: false})))
    // Initiate partsCounter with the parts from the buttons prop
    let [partsCounter, changePartsCounter] = useState((
        () => {
            let returnObj = {};
            buttons.forEach(button => {returnObj[button.part] = 0});
            return returnObj;
        }
    )());
    let [hoveringButton, changeHoveringButtonState] = useState(false);
    let [finished, changeFinished] = useState("unchecked")

    let incPart = (name) => (changePartsCounter(partsCounter => ({...partsCounter, [name]: partsCounter[name] + 1})))

    function recompileSelection(){
        changeHeighlightedText("");
        words.forEach((word, index) => {
                if(word.heighlighted){
                    changeHeighlightedText(heighlightedText => heighlightedText += words[index].word + " ");
                }
            })
    }

    function toggleHeighlightWord(index){
        let newActiveArr = [...words]
        newActiveArr[index].heighlighted = !(newActiveArr[index].heighlighted)
        modifyWordsArr(newActiveArr)
        recompileSelection()
    }

    function togglePartOfSomethingWord(index){
        let newActiveArr = [...words]
        newActiveArr[index].partOfSomething = !(newActiveArr[index].partOfSomething)
        modifyWordsArr(newActiveArr)
    }

    function atributePartToWord(index, part, partType){
        let newActiveArr = [...words]
        newActiveArr[index].partOf = part
        newActiveArr[index].partType = partType
        modifyWordsArr(newActiveArr)
    }

    let returnWordWithStyle = (wordObj) => (<><SelectableWord word= {wordObj.word} highlighted = {wordObj.heighlighted} inactive = {wordObj.partOfSomething} hover = {wordObj.hovering}/> &nbsp;</>)

    let activeWord = (wordObj, index) => (
        <span
        key = {index}
        onClick = {() => {toggleHeighlightWord(index)}}>
            {returnWordWithStyle(wordObj)}
        </span>
    )

    let getHoverText = (index) => ("Double click to disable; Part of " + words[index].partOf)

    let disablePart = (part) => {
        words.forEach((word, index) => {
            if (word.partOf === part){
                togglePartOfSomethingWord(index); 
                atributePartToWord(index, null, null);
            }
        })
    }

    let triggerHoverForPart = (part, hoverValue) => {
        let indexArr = [];
        words.forEach((word, index) => {
            if (word.partOf === part){
                indexArr.push(index);
            }
        }) 
        let newWords = [...words];
        indexArr.forEach((i) => {newWords[i].hovering = hoverValue})
        modifyWordsArr(newWords);
    }

    let inactiveWord = (wordObj, index) => (<span
        key = {index}
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title= {getHoverText(index)}
        onMouseEnter = {() => {triggerHoverForPart(wordObj.partOf, true)}}
        onMouseLeave = {() => {triggerHoverForPart(wordObj.partOf, false)}}
        onDoubleClick = {() => {disablePart(wordObj.partOf)}}
        >{returnWordWithStyle(wordObj)}</span>
    )

    let returnWord = (wordObj, index) => (wordObj.partOfSomething? inactiveWord(wordObj, index) : activeWord(wordObj, index))

    let getPart = (part) => {
        incPart(part);
        return part + String(partsCounter[part]) 
    }

    let selectPartForHeighlightedText = (partType) => {
        let part = getPart(partType);
        words.forEach((word, index) => {
                if(word.heighlighted){
                    togglePartOfSomethingWord(index);
                    atributePartToWord(index, part, partType);
                    toggleHeighlightWord(index);
                }
            })
    }

    let buttonFactory = (buttonComponent, index) => (
        <button
        type="button" className="btn btn-outline-dark"
        key = {index}
        onMouseEnter = {() => changeHoveringButtonState(true)}
        onMouseLeave = {() => changeHoveringButtonState(false)}
        onClick = {() => selectPartForHeighlightedText(buttonComponent.part)}
        >
            {buttonComponent.name}
        </button>
    )

    let checkAction = () => {
        if (checkifFinished(words))
            changeFinished("finished");
        else
            changeFinished("unfinished");
    }

    return(
        <div>
            <div>
                {words.map(
                    (wordObj, index) => (returnWord(wordObj, index))
                    )}
            </div>
            <br/>
            
            <span style = {hoveringButton? {border: "thick solid yellow"} : {}}>{heighlightedText}</span>
            <br/><br/>

            <div>
                {/* Make buttons dynamically */}
                {buttons.map((button, index) => (buttonFactory(button)))}
                <button type="button" className="btn btn-outline-dark" onClick={checkAction}>Done</button>
                <span style = {{color: finished === "unfinished"? "red" : "green", visibility: (finished === "unfinished" || finished === "finished")? "visible" : "hidden"}}>{finished === "unfinished"? "Try Again." : "Congratulations!"}</span>
            </div>
        </div>
    )

}

export default SelectableText;