import React, {useState} from "react";
import Dashboard from './Dashboard.js';
import App from "./App.js";
import DBTest from './DBTest';
import AdminPannel from "./AdminPannel.js";
import ProfessorPannel from "./ProfessorPannel.js";

export default function Router(){
    let [pageNum, changePageNum] = useState(1);

    return(
        <>
            <Dashboard changePage = {changePageNum}/>
            
            {
                pageNum === 1? 
                    <App/> :
                pageNum === 2?
                    <ProfessorPannel changePage={changePageNum}/>:
                pageNum === 3?
                    <AdminPannel changePage = {changePageNum}/>:
                pageNum === 4?
                    <DBTest/>:
                <p>Wrong page number in state</p>
            }
        </>
    )
}