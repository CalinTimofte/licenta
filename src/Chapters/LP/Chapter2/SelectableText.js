import React, {useState} from "react";

function SelectableWord({word, highlighted, inactive}){
    let selectedStyle = {backgroundColor: "yellow"}
    let unselectedStytle = {}
    let inactiveStyle = {backgroundColor: "gray"}

    return(
        <span style = {inactive? inactiveStyle: highlighted? selectedStyle : unselectedStytle}>{word}</span>
    )
}

function SelectableText({sentenceHandler, words}){
    let [selectedText, changeSelectedText] = useState("");
    let [clickedWords, modifyClickedWordsArr] = useState(words.split(" ").map(word => ({word: word, active: false, partOfSomething: true, partOf: null})))

    function recompileSelection(){
        changeSelectedText("");
        sentenceHandler("");
        clickedWords.forEach((word, index) => {
                if(word.active){
                    changeSelectedText(selectedText => selectedText += clickedWords[index].word);
                    changeSelectedText(selectedText => {let s = selectedText += " "; sentenceHandler(s); return s;});
                }
            })
    }

    function selectClickedWords(index){
        let newActiveArr = [...clickedWords]
        newActiveArr[index].active = !(newActiveArr[index].active)
        modifyClickedWordsArr(newActiveArr)
        recompileSelection()
    }

    function toggleClickedWords(index){
        let newActiveArr = [...clickedWords]
        newActiveArr[index].partOfSomething = !(newActiveArr[index].partOfSomething)
        modifyClickedWordsArr(newActiveArr)
        recompileSelection()
    }

    let returnWordWithStyle = (wordObj) => (<><SelectableWord word= {wordObj.word} highlighted = {wordObj.active} inactive = {wordObj.partOfSomething}/> &nbsp;</>)

    let activeWord = (wordObj, index) => (
        <span
        key = {index}
        onClick = {() => {selectClickedWords(index)}}>
            {returnWordWithStyle(wordObj)}
        </span>
    )

    let inactiveWord = (wordObj, index) => (<span
        key = {index}
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title= "Double click to disable; Part of prop1"
        onDoubleClick = {() => {toggleClickedWords(index)}}
        >{returnWordWithStyle(wordObj)}</span>
    )

    let returnWord = (wordObj, index) => (wordObj.partOfSomething? inactiveWord(wordObj, index) : activeWord(wordObj, index))

    return(
        <div>
            {clickedWords.map(
                (wordObj, index) => (returnWord(wordObj, index))
                )}
        </div>
    )

}

export default SelectableText;