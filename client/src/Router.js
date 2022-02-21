import React, {useState} from "react";
import Dashboard from './Dashboard.js';
import App from "./App.js";
import AdminPanel from "./AdminPanel.js";
import ProfessorPanel from "./ProfessorPanel.js";

export default function Router(){
    // State used to display different pages accessible by different types of users
    let [pageNum, changePageNum] = useState(1);

    return(
        <>
            <Dashboard changePage = {changePageNum}/>
            
            {
                pageNum === 1? 
                    <App/> :
                pageNum === 2?
                    <ProfessorPanel changePage={changePageNum}/>:
                pageNum === 3?
                    <AdminPanel changePage = {changePageNum}/>:
                <p>Wrong page number in state</p>
            }
        </>
    )
}