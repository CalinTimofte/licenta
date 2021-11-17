import React, {useState} from 'react';

export default function SubChapters(){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    return(
        <div className = "subchapters">
            <ul id = "subchapters" className = "collapsible nav nav-pills flex-column">
                <li className = "nav-item"><a class="nav-link active" href="#">SubLink</a></li>
                <li className = "nav-item"><a class="nav-link" href="#">SubLink</a></li>
            </ul>
            <a href = "#subchapters" data-bs-toggle="collapse" onClick = {reverseMenu}><i className={open? "fa fa-arrow-left" : "fa fa-arrow-right"} aria-hidden="true"></i></a>
        </div>
    )
}