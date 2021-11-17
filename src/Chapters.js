import React, {useState} from 'react';

function Chapters(){

    let [open, reverseArrow] = useState(false)

    let reverseMenu = () => {reverseArrow(() => (!open))}

    return(
        <div className = "menu-up">
            <div id = "demo" class = "collapsible">
                Lorem ipsum dolor text....
            </div>
            <a href = "#demo" data-bs-toggle="collapse" onClick = {reverseMenu}><i className={open? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></a>
        </div>
    )
}

export default Chapters;