import React, {useState} from 'react';
import ArrowButton from './Reusables/ArrowButton';

export default function SubChapters({subchapterNames, subchapterHandler, activeSubChapter}){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    let activeLinkState = (subchapterName) => (
        subchapterName === activeSubChapter ? "nav-link active" : "nav-link"
    )

    return(
        <div className = "subchapters">
            <ul className = "nav nav-pills flex-column" style = {!open? {display:'none'} : {display: 'flex'}}>
                {subchapterNames.map(name => (
                        <li className = "nav-item" id = {subchapterNames.indexOf(name)}>
                            <a className = {activeLinkState(name)} onClick = {() => subchapterHandler(name)} href="#">
                                {name}
                            </a>
                        </li>
                    ))}
            </ul>
            <ArrowButton iconNames = {{open:"left", closed:"right"}} tooltipName = "Subchapters" menuStateVar = {open} menuStateHandler = {reverseMenu}/>
        </div>
    )
}