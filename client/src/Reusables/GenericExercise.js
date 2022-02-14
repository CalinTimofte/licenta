import React, {useContext} from "react";
import {LocalStorageContext} from "../LocalStorageContext"

export default function GenericExercise({children, envProp, envPropArr}){
    const {getUserData, setUserData} = useContext(LocalStorageContext);

    let isLoggedIn = () => document.cookie.indexOf("loggedIn") !== -1;

    let isEnvPropSet = () => (isLoggedIn()? getUserData().env.includes(envProp) : false);
    let setEnvProp = () => setUserData({...getUserData(), env: [...getUserData().env, envProp]})

    let isEnvPropSetArr = (index) => (isLoggedIn()? getUserData().env.includes(envPropArr[index]) : false);
    let setEnvPropArr = (index) => setUserData({...getUserData(), env: [...getUserData().env, envPropArr[index]]})

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    {React.cloneElement(children, {isEnvPropSet, setEnvProp, isLoggedIn, isEnvPropSetArr,setEnvPropArr})}
                </div>
            </div>
        </div>
    )
}