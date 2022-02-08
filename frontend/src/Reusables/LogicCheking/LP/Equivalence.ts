import AtomicProp from "./AtomicProp";

export default function computeEquivalence(atomicProp1: AtomicProp, atomicProp2: AtomicProp){
    return atomicProp1.truthValue === atomicProp2.truthValue;
}