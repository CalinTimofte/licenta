import React, {useState} from "react";

function SelectableWord({word}){
    let [selected, changeSelect] = useState(false);

    let selectedStyle = {backgroundColor: "yellow"}
    let unselectedStytle = {}

    function toggle(){
        changeSelect(!selected)
    }

    return(
        <span onClick = {toggle} style = {selected? selectedStyle : unselectedStytle}>{word}</span>
    )
}

function SelectableText({sentenceHandler, words}){
    let [selectedText, changeSelectedText] = useState("");
    let [clickedWords, modifyClickedWordsArr] = useState({words: words.split(" "), activeArr: words.split(" ").map(() => false)})

    function recompileSelection(){
        changeSelectedText("");
        sentenceHandler("");
        clickedWords.activeArr.forEach((active, index) => {
                if(active){
                    changeSelectedText(selectedText => selectedText += clickedWords.words[index]);
                    changeSelectedText(selectedText => {let s = selectedText += " "; sentenceHandler(s); return s;});
                }
            })
    }

    function changeClickedWords(index){
        let newActiveArr = clickedWords.activeArr
        newActiveArr[index] = !(newActiveArr[index])
        modifyClickedWordsArr({words: clickedWords.words, activeArr: newActiveArr})
        recompileSelection()
    }

    return(
        <div>
            {clickedWords.words.map((word, index) => (
                <span key = {index} onClick = {() => changeClickedWords(index)}><SelectableWord word = {word}/>&nbsp;</span>
            ))}
        </div>
    )

}

export default SelectableText;