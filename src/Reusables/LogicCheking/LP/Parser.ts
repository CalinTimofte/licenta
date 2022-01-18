import AtomicProp from "./AtomicProp";
import computeConjuncton from "./Conjunction";

function checkFormatting(input: Array<AtomicProp|string>){
    // Does not take not into account yet
    if(typeof input[0] === "string" || typeof input[input.length-1] === "string")
        throw("Malformed input");
    for(let i = 0; i < input.length - 1; i++){
        if(typeof(input[i]) === typeof(input[i+1]))
            throw ("Malformed input");
    }
}

function computeShuntingYard(input: Array<AtomicProp|string>){
    checkFormatting(input);
    let priorityOfOperations : Array<string> = ["and"];
    let queue : Array<AtomicProp|string> = [];
    let stack : Array<AtomicProp|string> = [];
    for(let i = 0; i < input.length; i++){
        if(typeof input[i] !== "string")
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

function computeTruthValue(input: Array<AtomicProp|string>){
    let queue = computeShuntingYard(input);
    let operations = ["and"];
    let operationFunctions = [computeConjuncton];
    while(queue.length > 1){
        for(let i = 0; i < queue.length; i++){
            if (operations.includes(queue[i])){
                let result = operationFunctions[operations.indexOf(queue[i])](queue[i-1], queue[i-2]);
                queue.splice(i-2, 3, {name: "aux", truthValue:result});
                break;
            }
        }
    }
    return(queue[0].truthValue);
}