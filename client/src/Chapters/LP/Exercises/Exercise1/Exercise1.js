import React from "react";
import SelectableText from "./SelectableText";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise1(){
    return(
        <GenericExercise envProp={"exercise1"}>
            <SelectableText inputWords = "I play at home and I study at school"
            />
        </GenericExercise>
    )
}