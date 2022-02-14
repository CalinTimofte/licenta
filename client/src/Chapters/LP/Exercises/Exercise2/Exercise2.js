import React from "react";
import SentenceCreator from "./SentenceCreator";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise2(){
    return(
        <GenericExercise envProp={"exercise2"}>
            <SentenceCreator operations={[{name: "and", symbol: "∧"}]}/>
        </GenericExercise>
    )
}