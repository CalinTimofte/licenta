import React, {useState} from 'react';
import Content from './Content';
import Chapters from './Chapters';
import SubChapters from './Subchapters';
import {LPIntroducere} from './Chapters/LP/Introducere';
import {LP1Introducere} from './Chapters/LP1/Introducere';

export default function App(){
    let chapters = {
        lp : {subchapter1: [
                {name: "Section1", content: <p>Section1 Text</p>},
                {name: "Exercises-Section1", content: <div style = {{display: "flex", flexDirection: "column"}}><p>Exercise1</p><p>Exercise2</p></div>}
            ]},
        lp1 : {subchapter1: LP1Introducere}
    }

    let [activeChapter, changeActiveChapter] = useState("LP");

    let selectActiveChapter = (chapterName)=>{
        changeActiveChapter(chapterName);
    }

    let [activeSubChapter, changeActiveSubchapter] = useState("Section1");

    let findActiveSubchapter = () => (chapters.lp.subchapter1.find(section => section.name === activeSubChapter))
    let getSubchapterNames = () => (chapters.lp.subchapter1.map(obj => obj.name))

    let selectActiveSubchapter = (subchapterName)=>{
        changeActiveSubchapter(subchapterName);
    }

    let displayContent = () => {
        return(findActiveSubchapter().content)
    } 

    return(
        <>
            <Chapters chapterHandler = {selectActiveChapter} activeChapter = {activeChapter}/>
            <SubChapters subchapterNames = {getSubchapterNames()} subchapterHandler = {selectActiveSubchapter} activeSubChapter = {activeSubChapter}/>
            <Content content = {displayContent()}/>
        </>
    )
}