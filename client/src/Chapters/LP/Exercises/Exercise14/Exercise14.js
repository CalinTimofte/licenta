import React from "react";
import RuleApplier from "./RuleApplier.js";
import GenericExercise from "../../../../Reusables/GenericExercise";

export default function Exercise14(){

    return(
        <GenericExercise envPropArr = {["exercise14a", "exercise14b", "exercise14c", "exercise14d", "exercise14e"]}>
            <RuleApplier/>
        </GenericExercise>
    )
}