import React, {useState} from "react";

function SelectableWord({word, active}){
    let [selected, changeSelect] = useState(false);

    let selectedStyle = {backgroundColor: "yellow"}
    let unselectedStytle = {}

    function changeActive(){
        active = !active
    }

    
    function toggle(){
        changeSelect(!selected)
    }

    let activeWord = <span
    onClick = {toggle}
    style = {selected? selectedStyle : unselectedStytle}>{word}</span>

    let inactiveWord = <span
    data-bs-toggle="tooltip"
    data-bs-placement="bottom"
    title= "Double click to disable; Part of prop1"
    onDoubleClick = {changeActive}
    style = {{backgroundColor: "gray"}}>{word}</span>

    return(
        <>{active? activeWord : inactiveWord}</>
    )
}

function SelectableText({sentenceHandler, words}){
    let [selectedText, changeSelectedText] = useState("");
    let [clickedWords, modifyClickedWordsArr] = useState(words.split(" ").map(word => ({word: word, active: false, partOfSomething: false, partOf: null})))

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

    function changeClickedWords(index){
        let newActiveArr = [...clickedWords]
        newActiveArr[index].active = !(newActiveArr[index].active)
        modifyClickedWordsArr(newActiveArr)
        recompileSelection()
    }

    return(
        <div>
            {clickedWords.map((wordObj, index) => (
                <span key = {index} onClick = {() => changeClickedWords(index)}><SelectableWord active = {true} word = {wordObj.word}/>&nbsp;</span>
            ))}
        </div>
    )

}

export default SelectableText;