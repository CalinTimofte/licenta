import AtomicProp from "./AtomicProp";

export default function computeConjuncton(atomicProp1: AtomicProp, atomicProp2: AtomicProp){
    return atomicProp1.truthValue && atomicProp2.truthValue;
}