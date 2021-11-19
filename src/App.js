import React, {useState} from 'react';
import Content from './Content';
import Chapters from './Chapters';
import SubChapters from './Subchapters';
import {LPIntroducere} from './Chapters/LP/Introducere';
import {LP1Introducere} from './Chapters/LP1/Introducere';

export default function App(){
    let [chapter, changeChapter] = useState("LP");

    let lp = {subchapter1: LPIntroducere};
    let lp1 = {subchapter1: LP1Introducere};

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
            <Chapters chapterHandler = {selectChapter} activeChapter = {chapter}/>
            <SubChapters/>
            <Content content = {displayContent()}/>
        </>
    )
}