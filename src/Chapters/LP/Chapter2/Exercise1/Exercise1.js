import React, {useState} from "react";
import SelectableText from "../SelectableText";

export default function Exercise1(){
    let [selectedText, changeSelectedText] = useState("");

    function changeText(text){
        changeSelectedText(text);
    }

    return(
        <div>
            <SelectableText words = "ma joc acasa si invat la scoala" sentenceHandler = {changeText}/>
            <br/>
            {selectedText}
        </div>
    )
}