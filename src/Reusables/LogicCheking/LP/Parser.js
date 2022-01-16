import { isThrowStatement } from "typescript";
import AtomicProp from "./AtomicProp";
import computeConjuncton from "./Conjunction";

function checkFormatting(input){
    // Does not take not into account yet
    debugger
    if(typeof input[0] === String || typeof input[input.length] === String)
        throw("Malformed input");
    for(let i = 0; i < input.length - 1; i++){
        if(typeof(input[i]) === typeof(input[i+1]))
            throw ("Malformed input");
    }
}