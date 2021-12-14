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



function SelectableText({inputWords}){
    let [heighlightedText, changeHeighlightedText] = useState("");
    let [words, modifyWordsArr] = useState(inputWords.split(" ").map(word => ({word: word, heighlighted: false, partOfSomething: false, partOf: null, hovering: false})))
    let [partsCounter, changePartsCounter] = useState({props: 0, conjunctions: 0});
    let [hoveringBUtton, changeHoveringButtonState] = useState(false);

    let incProps = () => (changePartsCounter(partsCounter => ({...partsCounter, props: partsCounter.props + 1})))
    let incConjunctions = () => (changePartsCounter(partsCounter => ({...partsCounter, conjunctions: partsCounter.conjunctions + 1})))

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
        if (part === "prop"){
            incProps();
            return "prop" + String(partsCounter.props)
        }
        else if (part === "conjunction"){
            incConjunctions();
            return "conjunction" + String(partsCounter.conjunctions)
        }
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

    let buttonFunc = (buttonComponent) => (
        <button
        onMouseEnter = {() => changeHoveringButtonState(true)}
        onMouseLeave = {() => changeHoveringButtonState(false)}
        onClick = {() => selectPartForHeighlightedText(buttonComponent)}
        >
            {buttonComponent === "prop"? "Atomic Prop": "Conjunction"}
        </button>
    )

    return(
        <div>
        <div>
            {words.map(
                (wordObj, index) => (returnWord(wordObj, index))
                )}
        </div>
        <br/>
        
        <span style = {hoveringBUtton? {border: "thick solid yellow"} : {}}>{heighlightedText}</span>
        <br/><br/>

        <div>
            {buttonFunc("prop")}
            {buttonFunc("conjunction")}
        </div>
        </div>
    )

}

export default SelectableText;