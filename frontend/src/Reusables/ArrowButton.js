import React from 'react';

export default function ArrowButton({iconNames, tooltipName, menuStateVar, menuStateHandler}){
    return(
        <>
            <button 
                className = "btn btn-outline-dark"
                data-bs-toggle="tooltip"  
                title={tooltipName} 
                onClick = {menuStateHandler}
            >
                <i
                    className={menuStateVar? `fa fa-arrow-${iconNames.open}` : `fa fa-arrow-${iconNames.closed}`} 
                    aria-hidden="true" 
                />
            </button>
        </>
    )
}