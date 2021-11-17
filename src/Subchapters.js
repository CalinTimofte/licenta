import React, {useState} from 'react';

export default function SubChapters(){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    return(
        <div className = "subchapters">
            <ul className = "nav nav-pills flex-column" style = {!open? {display:'none'} : {display: 'flex'}}>
                <li className = "nav-item"><a class="nav-link active" href="#">SubLink</a></li>
                <li className = "nav-item"><a class="nav-link" href="#">SubLink</a></li>
            </ul>
            <i className={open? "fa fa-arrow-left" : "fa fa-arrow-right"} aria-hidden="true" aria-hidden="true" data-bs-toggle="tooltip"  title="Subchapters" onClick = {reverseMenu}/>
        </div>
    )
}