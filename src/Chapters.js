import React, {useState} from 'react';
import ArrowButton from './Reusables/ArrowButton';

function Chapters({chapterHandler}){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    return(
        <div className = "chapters">
            <ul className = "nav nav-pills" style = {!open? {display:'none'} : {display: 'flex'}}>
                <li className = "nav-item"><a class="nav-link active" href="#" onClick = {() => chapterHandler("LP")}>LP</a></li>
                <li className = "nav-item"><a class="nav-link" href="#" onClick = {() => chapterHandler("LP1")}>LP1</a></li>
            </ul>
            <ArrowButton iconNames = {{open: "up", closed: "down"}} tooltipName = "Chapters" menuStateVar = {open} menuStateHandler = {reverseMenu}/>
        </div>
    )
}

export default Chapters;