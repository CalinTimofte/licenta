import React, {useState} from 'react';
import Content from './Content';
import Chapters from './Chapters';
import SubChapters from './Subchapters';
import {LPIntroducere} from './Chapters/LP/Introducere';
import {LP1Introducere} from './Chapters/LP1/Introducere';

export default function App(){
    let chapters = {
        lp : [
            {
                name: "Introducere",
                content:[
                    {name:"Intro", content: LPIntroducere}
                ]
            },
            {
                name: "Subchapter2",
                content:[
                {name: "Section1", content: <p>Section1 Text</p>},
                {name: "Exercises-Section1", content: <div style = {{display: "flex", flexDirection: "column"}}><p>Exercise1</p><p>Exercise2</p></div>}
                ]
            }
            ],
        lp1 : [
            {
                name: "Introducere",
                content:[{name:"Intro", content: LP1Introducere}]
            }
        ]
    }

    let [activeChapter, changeActiveChapter] = useState("LP");

    let findActiveChapter = () => {
        switch(activeChapter){
            case "LP":  return chapters.lp;
            case "LP1": return chapters.lp1;
            default: return chapters.lp;
        }
    }

    let selectActiveChapter = (chapterName)=>{
        changeActiveChapter(chapterName);
    }

    let [activeSubChapter, changeActiveSubchapter] = useState("Introducere");

    let findActiveSubchapter = () => (findActiveChapter().find(subchapter => subchapter.name === activeSubChapter))
    let getSubchapterNames = () => (findActiveChapter().map(obj => obj.name))

    let selectActiveSubchapter = (subchapterName)=>{
        changeActiveSubchapter(subchapterName);
    }

    let [activeSection, changeActiveSection] = useState("Intro");

    let findActiveSection = () => (findActiveSubchapter().content.find(section => section.name === activeSubChapter))

    let selectActiveSection = (sectionName)=>{
        changeActiveSection(sectionName);
    }

    let displayContent = () => {
        return(findActiveSection().content)
    } 

    return(
        <>
            <Chapters chapterHandler = {selectActiveChapter} activeChapter = {activeChapter}/>
            <SubChapters 
                subchapterNames = {getSubchapterNames()} 
                subchapterHandler = {selectActiveSubchapter} 
                activeSubChapter = {activeSubChapter}
                sectionHandler = {selectActiveSection}
                activeSection = {activeSection}
            />
            <Content content = {displayContent()}/>
        </>
    )
}