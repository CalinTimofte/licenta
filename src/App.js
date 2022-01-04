import React, {useState} from 'react';
import Content from './Content';
import Chapters from './Chapters';
import SubChapters from './Subchapters';

import {LPIntroduction} from './Chapters/LP/Chapter1/Introducere';

import {LP1Introduction} from './Chapters/LP1/Chapter1/Introducere';

import { LP2_0 } from './Chapters/LP/Chapter2/Layouts/2.0';
import { LP2_1 } from './Chapters/LP/Chapter2/Layouts/2.1';
import { LP2_2 } from './Chapters/LP/Chapter2/Layouts/2.2';
import { LP2_3 } from './Chapters/LP/Chapter2/Layouts/2.3';
import { LP2_4 } from './Chapters/LP/Chapter2/Layouts/2.4';
import { LP2_5 } from './Chapters/LP/Chapter2/Layouts/2.5';
import { LP2_6 } from './Chapters/LP/Chapter2/Layouts/2.6';
import { LP2_7 } from './Chapters/LP/Chapter2/Layouts/2.7';
import { LP2_8 } from './Chapters/LP/Chapter2/Layouts/2.8';
import { LP2_9 } from './Chapters/LP/Chapter2/Layouts/2.9';
import { LP2_10 } from './Chapters/LP/Chapter2/Layouts/2.10';

import { LP3_0 } from './Chapters/LP/Chapter3/Layouts/3.0';
import { LP3_1 } from './Chapters/LP/Chapter3/Layouts/3.1';
import { LP3_2 } from './Chapters/LP/Chapter3/Layouts/3.2';
import { LP3_3 } from './Chapters/LP/Chapter3/Layouts/3.3';
import { LP3_4 } from './Chapters/LP/Chapter3/Layouts/3.4';
import { LP3_5 } from './Chapters/LP/Chapter3/Layouts/3.5';
import { LP3_6 } from './Chapters/LP/Chapter3/Layouts/3.6';
import { LP3_7 } from './Chapters/LP/Chapter3/Layouts/3.7';
import { LP3_8 } from './Chapters/LP/Chapter3/Layouts/3.8';
import { LP3_9 } from './Chapters/LP/Chapter3/Layouts/3.9';

export default function App(){
    let chapters = {
        lp : [
            {
                name: "Introduction",
                content:[
                    {name:"Introduction", content: LPIntroduction}
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
            {
                name: "Subchapter3",
                content:[
                    {name: "Introduction", content: LP3_0},
                    {name: "Alphabets in Computer Science", content: LP3_1},
                    {name: "The Alphabet of Propositional Logic", content: LP3_2},
                    {name: "Propositional Formulae", content: LP3_3},
                    {name: "Showing That a Word Is In PL", content: LP3_4},
                    {name: "The Main Connective of a Formula", content: LP3_5},
                    {name: "Showing That a Word Is Not In PL", content: LP3_6},
                    {name: "Unique Readability", content: LP3_7},
                    {name: "Object-Language and Meta-Language", content: LP3_8},
                    {name: "Exercise Sheet", content: LP3_9}
                ]
            }
            ],
        lp1 : [
            {
                name: "Introduction",
                content:[{name:"Introduction", content: LP1Introduction}]
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

    let [activeSubChapter, changeActiveSubchapter] = useState("Introduction");

    let findActiveSubchapter = () => (findActiveChapter().find(subchapter => subchapter.name === activeSubChapter))

    let selectActiveSubchapter = (subchapterName)=>{
        changeActiveSubchapter(subchapterName);
    }

    let [activeSection, changeActiveSection] = useState("Introduction");

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