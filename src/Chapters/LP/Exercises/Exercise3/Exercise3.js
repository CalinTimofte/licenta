import React from "react";
import SelectableText from "../Exercise1/SelectableText.js";

export default function Exercise3(){

    return(
        <div className="exercise">
            <div className="card">
                <div className="card-body bg-light">
                    <SelectableText 
                        inputWords = "I will buy a laptop or (I will buy) a tablet"
                        buttons={[{part: "prop", name: "Atomic Prop"}, {part: "disjunction", name: "Disjunction"}]}
                        checkifFinished={
                            (words) => {
                                if((words[0].partOf === words[1].partOf && words[2].partOf === words[3].partOf && words[1].partOf === words[2].partOf && words[1].partOf === words[4].partOf) &&
                                    (words[5].partType === "disjunction") &&
                                    (words[6].partOf === words[7].partOf && words[6].partOf === words[8].partOf && words[6].partOf === words[9].partOf && words[6].partOf === words[10].partOf)&&
                                    (words[0].partType === words[6].partType && words[0].partType === "prop"))
                                    return true;
                                else
                                    return false;
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
}