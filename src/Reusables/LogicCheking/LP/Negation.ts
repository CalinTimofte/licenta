import AtomicProp from "./AtomicProp";

export default function computeNegation(atomicProp1: AtomicProp){
    return !atomicProp1.truthValue;
}