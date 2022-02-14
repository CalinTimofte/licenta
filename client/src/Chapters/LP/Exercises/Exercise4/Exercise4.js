import React from "react";

import SentenceCreator from "../Exercise2/SentenceCreator.js";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise4(){
    return(
        <GenericExercise envProp={"exercise4"}>
            <SentenceCreator operations={[{name: "or", symbol: "∨"}]}/>
        </GenericExercise>
    )
}