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
        // Not an operation
        if(typeof input[i] === "object")
            queue.push(input[i]);
        else{
            // Start of stack, no other operations to compare to
            if(input.length === 0)
                stack.unshift(input[i]);
            else{
                // Can cast to string freely, already checked if not string earlier
                if(priorityOfOperations.indexOf(input[i] as string) > priorityOfOperations.indexOf(stack[0] as string))
                    stack.unshift(input[i]);
                else{
                    while((priorityOfOperations.indexOf(input[i] as string) <= priorityOfOperations.indexOf(stack[0] as string)) && stack.length > 0)
                        // Can't be null, we check if stack is empty
                        queue.push(stack.shift() as string);
                        stack.unshift(input[i]);
                }
            }
        }
    }
    while(stack.length > 0)
        // Can't be null, we check if stack is empty
        queue.push(stack.shift() as (AtomicProp | string));
    return queue
}

function computeTruthValue(input: Array<AtomicProp|string>){
    let queue : Array<AtomicProp|string> = computeShuntingYard(input);
    let operations : Array<string> = ["and"];
    let operationFunctions = [computeConjuncton];
    while(queue.length > 1){
        for(let i = 0; i < queue.length; i++){
            // If is operation
            if (typeof queue[i] === "string"){
                // We can cast because we know that if it's an operation it has two atomic props behind
                let result = operationFunctions[operations.indexOf(queue[i] as string)](queue[i-1] as AtomicProp, queue[i-2] as AtomicProp);
                queue.splice(i-2, 3, new AtomicProp("aux", result));
                break;
            }
        }
    }
    // Last element must be an atomic prop
    return((queue[0] as AtomicProp).truthValue);
}