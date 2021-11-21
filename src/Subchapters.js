import React, {useState} from 'react';
import ArrowButton from './Reusables/ArrowButton';

export default function SubChapters({subchapterNames, subchapterHandler, activeSubChapter, sectionHandler, activeSection}){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    let activeLinkState = (check)=> 
        ((name) => (
            name === check ? "nav-link active" : "nav-link"
        )
    )

    let activeSubChapterState = activeLinkState(activeSubChapter) + "btn";
    let activeSectionState = activeLinkState(activeSection);

    let sectionNames = (subchapter) => (subchapter.content.map(obj => obj.name))()

    return(
        <div className = "subchapters">
            <ul className = "nav nav-pills flex-column" style = {!open? {display:'none'} : {display: 'flex'}}>
                {subchapterNames.map(subchapterName => (
                    <li className = "card nav-item" id = {subchapterNames.indexOf(subchapterName)}>
                        <a class= {activeSubChapterState(subchapterName)} data-bs-toggle="collapse" href="#collapseOne"> 
                            {subchapterName} 
                        </a>
                        <ul className = "nav nav-pills flex-column">
                            <div id="collapseOne" class="collapse" data-bs-parent="#accordion">
                                {sectionNames.map(sectionName => (
                                        <li className = "nav-item" id = {sectionNames.indexOf(sectionName)}>
                                            <a className = {activeSectionState(sectionName)} onClick = {() => {sectionHandler(sectionName); subchapterHandler(subchapterName)}} href="#">
                                                {sectionName}
                                            </a>
                                        </li>
                                    ))}
                            </div>
                        </ul>
                    </li>
                ))}
            </ul>
            <ArrowButton iconNames = {{open:"left", closed:"right"}} tooltipName = "Subchapters" menuStateVar = {open} menuStateHandler = {reverseMenu}/>
        </div>
    )
}