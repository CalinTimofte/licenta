import React, {useState} from 'react';
import ArrowButton from './Reusables/ArrowButton';

export default function SubChapters(){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    return(
        <div className = "subchapters">
            <ul className = "nav nav-pills flex-column" style = {!open? {display:'none'} : {display: 'flex'}}>
                <li className = "nav-item"><a class="nav-link active" href="#">SubLink</a></li>
                <li className = "nav-item"><a class="nav-link" href="#">SubLink</a></li>
            </ul>
            <ArrowButton iconNames = {{open:"left", closed:"right"}} tooltipName = "Subchapters" menuStateVar = {open} menuStateHandler = {reverseMenu}/>
        </div>
    )
}