import React, {useContext} from "react";
import {LocalStorageContext} from "../LocalStorageContext"

export default function GenericExercise({children, envProp}){
    const {getUserData, setUserData} = useContext(LocalStorageContext);

    let isLoggedIn = () => document.cookie.indexOf("loggedIn") !== -1;

    let isEnvPropSet = () => (isLoggedIn()? getUserData().env.includes(envProp) : false);
    let setEnvProp = () => setUserData({...getUserData(), env: [...getUserData().env, envProp]})

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    {React.cloneElement(children, {isEnvPropSet, setEnvProp, isLoggedIn})}
                </div>
            </div>
        </div>
    )
}