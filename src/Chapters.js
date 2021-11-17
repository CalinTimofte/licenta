import React, {useState} from 'react';

function Chapters(){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    return(
        <div className = "chapters">
            <ul className = "nav nav-pills" style = {!open? {display:'none'} : {display: 'flex'}}>
                <li className = "nav-item"><a class="nav-link active" href="#">Link</a></li>
                <li className = "nav-item"><a class="nav-link" href="#">Link</a></li>
            </ul>
            <i className={open? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true" data-bs-toggle="tooltip"  title="Chapters" onClick = {reverseMenu}/>
        </div>
    )
}

export default Chapters;