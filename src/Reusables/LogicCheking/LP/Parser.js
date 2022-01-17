import { isThrowStatement } from "typescript";
import AtomicProp from "./AtomicProp";
import computeConjuncton from "./Conjunction";

function checkFormatting(input){
    // Does not take not into account yet
    if(typeof input[0] === "string" || typeof input[input.length] === "string")
        throw("Malformed input");
    for(let i = 0; i < input.length - 1; i++){
        if(typeof(input[i]) === typeof(input[i+1]))
            throw ("Malformed input");
    }
}

function applyShuntingYard(input){
    checkFormatting(input);
    let priorityOfOperations = ["and"];
    let queue = [];
    let stack = [];
    for(let i = 0; i < input.length; i++){
        if(!priorityOfOperations.includes(input[i]))
            queue.push(input[i]);
        else{
            if(input.length === 0)
                stack.unshift(input[i]);
            else{
                if(priorityOfOperations.indexOf(input[i]) > priorityOfOperations.indexOf(stack[0]))
                    stack.unshift(input[i]);
                else{
                    while(priorityOfOperations.indexOf(input[i]) <= priorityOfOperations.indexOf(stack[0]))
                        queue.push(stack.shift());
                        stack.unshift(input[i]);
                }
            }
        }
    }
    while(stack.length > 0)
        queue.push(stack.shift());
    return queue
}