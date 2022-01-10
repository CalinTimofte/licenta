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

import { LP4_0 } from './Chapters/LP/Chapter4/Layouts/4.0';
import { LP4_1 } from './Chapters/LP/Chapter4/Layouts/4.1';
import { LP4_2 } from './Chapters/LP/Chapter4/Layouts/4.2';
import { LP4_3 } from './Chapters/LP/Chapter4/Layouts/4.3';
import { LP4_4 } from './Chapters/LP/Chapter4/Layouts/4.4';

import { LP5_0 } from './Chapters/LP/Chapter5/Layouts/5.0';
import { LP5_1 } from './Chapters/LP/Chapter5/Layouts/5.1';
import { LP5_2 } from './Chapters/LP/Chapter5/Layouts/5.2';
import { LP5_3 } from './Chapters/LP/Chapter5/Layouts/5.3';
import { LP5_4 } from './Chapters/LP/Chapter5/Layouts/5.4';
import { LP5_5 } from './Chapters/LP/Chapter5/Layouts/5.5';
import { LP5_6 } from './Chapters/LP/Chapter5/Layouts/5.6';
import { LP5_7 } from './Chapters/LP/Chapter5/Layouts/5.7';
import { LP5_8 } from './Chapters/LP/Chapter5/Layouts/5.8';
import { LP5_9 } from './Chapters/LP/Chapter5/Layouts/5.9';
import { LP5_10 } from './Chapters/LP/Chapter5/Layouts/5.10';

import { LP6_0 } from './Chapters/LP/Chapter6/Layouts/6.0';
import { LP6_1 } from './Chapters/LP/Chapter6/Layouts/6.1';
import { LP6_2 } from './Chapters/LP/Chapter6/Layouts/6.2';
import { LP6_3 } from './Chapters/LP/Chapter6/Layouts/6.3';
import { LP6_4 } from './Chapters/LP/Chapter6/Layouts/6.4';
import { LP6_5 } from './Chapters/LP/Chapter6/Layouts/6.5';

import { LP7_0 } from './Chapters/LP/Chapter7/Layouts/7.0';
import { LP7_1 } from './Chapters/LP/Chapter7/Layouts/7.1';
import { LP7_2 } from './Chapters/LP/Chapter7/Layouts/7.2';
import { LP7_3 } from './Chapters/LP/Chapter7/Layouts/7.3';
import { LP7_4 } from './Chapters/LP/Chapter7/Layouts/7.4';
import { LP7_5 } from './Chapters/LP/Chapter7/Layouts/7.5';
import { LP7_5_1 } from './Chapters/LP/Chapter7/Layouts/7.5.1';
import { LP7_5_2 } from './Chapters/LP/Chapter7/Layouts/7.5.2';
import { LP7_5_3 } from './Chapters/LP/Chapter7/Layouts/7.5.3';
import { LP7_5_4 } from './Chapters/LP/Chapter7/Layouts/7.5.4';
import { LP7_5_5 } from './Chapters/LP/Chapter7/Layouts/7.5.5';
import { LP7_6 } from './Chapters/LP/Chapter7/Layouts/7.6';
import { LP7_7 } from './Chapters/LP/Chapter7/Layouts/7.7';
import { LP7_8 } from './Chapters/LP/Chapter7/Layouts/7.8';
import { LP7_9 } from './Chapters/LP/Chapter7/Layouts/7.9';

import { LP8_0 } from './Chapters/LP/Chapter8/Layouts/8.0';
import { LP8_1 } from './Chapters/LP/Chapter8/Layouts/8.1';
import { LP8_2 } from './Chapters/LP/Chapter8/Layouts/8.2';
import { LP8_3 } from './Chapters/LP/Chapter8/Layouts/8.3';
import { LP8_4 } from './Chapters/LP/Chapter8/Layouts/8.4';
import { LP8_5 } from './Chapters/LP/Chapter8/Layouts/8.5';
import { LP8_6 } from './Chapters/LP/Chapter8/Layouts/8.6';
import { LP8_7 } from './Chapters/LP/Chapter8/Layouts/8.7';
import { LP8_8 } from './Chapters/LP/Chapter8/Layouts/8.8';

import { LP9_0 } from './Chapters/LP/Chapter9/Layouts/9.0';
import { LP9_1 } from './Chapters/LP/Chapter9/Layouts/9.1';
import { LP9_1_1 } from './Chapters/LP/Chapter9/Layouts/9.1.1';
import { LP9_1_2 } from './Chapters/LP/Chapter9/Layouts/9.1.2';
import { LP9_2 } from './Chapters/LP/Chapter9/Layouts/9.2';
import { LP9_3 } from './Chapters/LP/Chapter9/Layouts/9.3';
import { LP9_4 } from './Chapters/LP/Chapter9/Layouts/9.4';
import { LP9_5 } from './Chapters/LP/Chapter9/Layouts/9.5';
import { LP9_6 } from './Chapters/LP/Chapter9/Layouts/9.6';
import { LP9_7 } from './Chapters/LP/Chapter9/Layouts/9.7';

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
                name: "Informal Propositional Logic",
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
                name: "The Formal Syntax of Propositional Logic",
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
            },
            {
                name: "Functions Defined Recursively on PL",
                content:[
                    {name: "Introduction", content: LP4_0},
                    {name: "The Abstract Syntax Tree of a Formula", content: LP4_1},
                    {name: "Other Examples of Recursively Defined Functions", content: LP4_2},
                    {name: "Proofs by Structural Induction", content: LP4_3},
                    {name: "Exercise Sheet", content: LP4_4}
                ]
            },
            {
                name: "Semantics of Propositional Logic",
                content:[
                    {name: "Introduction", content: LP5_0},
                    {name: "Assignments", content: LP5_1},
                    {name: "Truth Value of A Formula in An Assignment", content: LP5_2},
                    {name: "Satisfiability", content: LP5_3},
                    {name: "Valid Formulae", content: LP5_4},
                    {name: "Contingent Formulae", content: LP5_5},
                    {name: "Equivalence", content: LP5_6},
                    {name: "Semantical Consequence", content: LP5_7},
                    {name: "Consistent set of formulae", content: LP5_8},
                    {name: "Application 1", content: LP5_9},
                    {name: "Exercise Sheet", content: LP5_10}
                ]
            },
            {
                name: "Logical Connectives",
                content:[
                    {name: "Introduction", content: LP6_0},
                    {name: "Several Propositional Logics", content: LP6_1},
                    {name: "The relation between implications and semantical consequence", content: LP6_2},
                    {name: "Translating propositions from English into PL", content: LP6_3},
                    {name: "Application 2", content: LP6_4},
                    {name: "Exercise Sheet", content: LP6_5}
                ]
            },
            {
                name: "Natural Deduction",
                content:[
                    {name: "Introduction", content: LP7_0},
                    {name: "Sequents", content: LP7_1},
                    {name: "Inference Rules", content: LP7_2},
                    {name: "Proof System", content: LP7_3},
                    {name: "Formal Proofs", content: LP7_4},
                    {name: "Natural Deduction", content: LP7_5},
                    {name: "The Rules for Conjunction", content: LP7_5_1},
                    {name: "The Rules for Implications", content: LP7_5_2},
                    {name: "The Rules for Disjunctions", content: LP7_5_3},
                    {name: "The Rules for Negations", content: LP7_5_4},
                    {name: "Other Rules", content: LP7_5_5},
                    {name: "Natural Deduction Conclusion", content: LP7_6},
                    {name: "Derived Rules", content: LP7_7},
                    {name: "Soundness and Completeness for Natural Deduction", content: LP7_8},
                    {name: "Exercise Sheet", content: LP7_9}
                ]
            },
            {
                name: "Normal Forms",
                content:[
                    {name: "Introduction", content: LP8_0},
                    {name: "Replacement Theorem", content: LP8_1},
                    {name: "Literal", content: LP8_2},
                    {name: "Clauses", content: LP8_3},
                    {name: "Conjunctive Normal Form", content: LP8_4},
                    {name: "Bringing a Formula into CNF", content: LP8_5},
                    {name: "Disjunctive Normal Form", content: LP8_6},
                    {name: "The Link between DNF and CNF", content: LP8_7},
                    {name: "Exercise Sheet", content: LP8_8}
                ]
            },
            {
                name: "Resolution in Propositional Logic",
                content:[
                    {name: "Introduction", content: LP9_0},
                    {name: "Reminder on Conjunctive Normal Forms", content: LP9_1},
                    {name: "Clauses as Sets of Literals", content: LP9_1_1},
                    {name: "CNFs as Sets of Clauses", content: LP9_1_2},
                    {name: "Resolution", content: LP9_2},
                    {name: "Formal Proofs", content: LP9_3},
                    {name: "Soundness", content: LP9_4},
                    {name: "Completeness", content: LP9_5},
                    {name: "Proving Validity and Logical Consequences by Resolution", content: LP9_6},
                    {name: "Exercise Sheet", content: LP9_7}
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