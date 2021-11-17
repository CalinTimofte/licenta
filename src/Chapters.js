import React, {useState} from 'react';

function Chapters(){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    return(
        <div className = "chapters">
            <ul id = "chapters" className = "collapsible nav nav-pills">
                <li className = "nav-item"><a class="nav-link active" href="#">Link</a></li>
                <li className = "nav-item"><a class="nav-link" href="#">Link</a></li>
            </ul>
            <a href = "#chapters" data-bs-toggle="collapse" onClick = {reverseMenu}><i className={open? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></a>
        </div>
    )
}

export default Chapters;