import React, {useState} from 'react';
import Content from './Content';
import Chapters from './Chapters';
import SubChapters from './Subchapters';
import {LPIntroduction} from './Chapters/LP/Chapter1/Introducere';
import {LP1Introduction} from './Chapters/LP1/Chapter1/Introducere';
import { LP2_0 } from './Chapters/LP/Chapter2/2/2.0';
import { LP2_1 } from './Chapters/LP/Chapter2/2/2.1';
import { LP2_2 } from './Chapters/LP/Chapter2/2/2.2';
import { LP2_3 } from './Chapters/LP/Chapter2/2/2.3';
import { LP2_4 } from './Chapters/LP/Chapter2/2/2.4';
import { LP2_5 } from './Chapters/LP/Chapter2/2/2.5';
import { LP2_6 } from './Chapters/LP/Chapter2/2/2.6';
import { LP2_7 } from './Chapters/LP/Chapter2/2/2.7';
import { LP2_8 } from './Chapters/LP/Chapter2/2/2.8';
import { LP2_9 } from './Chapters/LP/Chapter2/2/2.9';
import { LP2_10 } from './Chapters/LP/Chapter2/2/2.10';

export default function App(){
    let chapters = {
        lp : [
            {
                name: "Introducere",
                content:[
                    {name:"Intro", content: LPIntroduction}
                ]
            },
            {
                name: "Subchapter2",
                content:[
                {name: "Introduction", content: LP2_0},
                {name: "Propositions", content: LP2_1},
                {name: "Atomic Propositions", content: LP2_2},
                {name: "Conjunctions", content: LP2_3},
                {name: "Disjunctions", content: LP2_4},
                {name: "Implications", content: LP2_5},
                {name: "Negations", content: LP2_6},
                {name: "Equivalences", content: LP2_7},
                {name: "Logical Connectives", content: LP2_8},
                {name: "Ambiguities in Natural Language", content: LP2_9},
                {name: "Exercise Sheet", content: LP2_10}
                ]
            },
            ],
        lp1 : [
            {
                name: "Introducere",
                content:[{name:"Intro", content: LP1Introduction}]
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
        changeActiveSubchapter(findActiveChapter()[0].name);
        changeActiveSection(findActiveChapter()[0].content[0].name);
    }

    let subchapterNameArray = () => (findActiveChapter().map(subchapter => ({
        subchapterName: subchapter.name,
        sectionNames: subchapter.content.map(section => section.name)
    })))

    let [activeSubChapter, changeActiveSubchapter] = useState("Introducere");

    let findActiveSubchapter = () => (findActiveChapter().find(subchapter => subchapter.name === activeSubChapter))

    let selectActiveSubchapter = (subchapterName)=>{
        changeActiveSubchapter(subchapterName);
    }

    let [activeSection, changeActiveSection] = useState("Intro");

    let findActiveSection = () => (findActiveSubchapter().content.find(section => section.name === activeSection))

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
                subchapterAndSectionNames = {subchapterNameArray()} 
                subchapterHandler = {selectActiveSubchapter} 
                activeSubChapter = {activeSubChapter}
                sectionHandler = {selectActiveSection}
                activeSection = {activeSection}
            />
            <Content content = {displayContent()}/>
        </>
    )
}