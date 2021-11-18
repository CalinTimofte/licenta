import React, {useState} from 'react';
import Content from './Content';
import Chapters from './Chapters';
import SubChapters from './Subchapters';

export default function App(){
    let [chapter, changeChapter] = useState("LP");

    let lp = {subchapter1: "LP subchapter1"};
    let lp1 = {subchapter1: "LP1 subchapter1"};

    let selectChapter = (chapterName)=>{
        changeChapter(chapterName);
    }

    let displayContent = () => {
        switch(chapter){
            case "LP":
                return lp.subchapter1;
            case "LP1":
                return lp1.subchapter1;
            default:
                return lp.subchapter1;
        }
    }

    return(
        <>
            <Chapters chapterHandler = {selectChapter}/>
            <SubChapters/>
            <Content content = {displayContent()}/>
        </>
    )
}