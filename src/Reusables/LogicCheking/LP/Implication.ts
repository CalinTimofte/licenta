import AtomicProp from "./AtomicProp";

export default function computeImplication(atomicProp1: AtomicProp, atomicProp2: AtomicProp){
    return atomicProp1.truthValue === false? true : (atomicProp2.truthValue === false? false : true);
}