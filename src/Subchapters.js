import React, {useState} from 'react';
import ArrowButton from './Reusables/ArrowButton';

export default function SubChapters({subchapterAndSectionNames, subchapterHandler, activeSubChapter, sectionHandler, activeSection}){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    let activeLinkState = (check)=> 
        ((name) => (
            name === check ? "nav-link active" : "nav-link"
        )
    )

    let activeSubChapterState = (name) => (activeLinkState(activeSubChapter)(name) + " btn");
    let activeSectionState = activeLinkState(activeSection);

    return(
        <div className = "subchapters">
            <ul className = "nav nav-pills flex-column" style = {!open? {display:'none'} : {display: 'flex'}}>
                {subchapterAndSectionNames.map(subchapter => (
                    <li className = "card nav-item" id = {subchapterAndSectionNames.indexOf(subchapter)}>
                        <a class= {activeSubChapterState(subchapter.subchapterName)} data-bs-toggle="collapse" href={"#collapse-" + subchapterAndSectionNames.indexOf(subchapter)}> 
                            {subchapter.subchapterName} 
                        </a>
                        <div id={"collapse-" + subchapterAndSectionNames.indexOf(subchapter)} class="collapse" data-bs-parent="#accordion">
                            <ul className = "subchapter-section nav nav-pills flex-column">
                                    {subchapter.sectionNames.map(sectionName => (
                                            <li className = "nav-item" id = {subchapter.sectionNames.indexOf(sectionName)}>
                                                <a className = {activeSectionState(sectionName)} onClick = {() => {sectionHandler(sectionName); subchapterHandler(subchapter.subchapterName)}} href="#">
                                                    {sectionName}
                                                </a>
                                            </li>
                                        ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
            <ArrowButton iconNames = {{open:"left", closed:"right"}} tooltipName = "Subchapters" menuStateVar = {open} menuStateHandler = {reverseMenu}/>
        </div>
    )
}