import React, {useState} from "react";
import Dashboard from './Dashboard.js';
import App from "./App.js";
import DBTest from './DBTest';

export default function Router(){
    let [pageNum, changePageNum] = useState(1);

    return(
        <>
            <Dashboard changePage = {changePageNum}/>
            
            {
                pageNum === 1? 
                    <App/> :
                pageNum === 2?
                    <div>
                        <p>Professor content</p>
                        <button className="btn btn-outline-dark" onClick={() => changePageNum(1)}>Go back</button>
                    </div> :
                pageNum === 3?
                    <div>
                        <p>Admin content</p>
                        <button className="btn btn-outline-dark" onClick={() => changePageNum(1)}>Go back</button>
                    </div> :
                pageNum === 4?
                    <DBTest/>:
                <p>Wrong page number in state</p>
            }
        </>
    )
}