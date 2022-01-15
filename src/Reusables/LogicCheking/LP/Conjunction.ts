import AtomicProp from "./AtomicProp";

export default class Conjunction{
    _atomicProp1: AtomicProp;
    _atomicProp2: AtomicProp;

    constructor(atomicProp1: AtomicProp, atomicProp2: AtomicProp){
        this._atomicProp1 = atomicProp1;
        this._atomicProp2 = atomicProp2;
    }

    get atomicProp1(){
        return this._atomicProp1;
    }

    set atomicProp1(updatedAtomicProp1){
        this._atomicProp1 = updatedAtomicProp1
    }

    get atomicProp2(){
        return this._atomicProp2;
    }

    set atomicProp2(updatedAtomicProp2){
        this._atomicProp2 = updatedAtomicProp2
    }

    compute(){
        return (this.atomicProp1.truthValue && this.atomicProp2.truthValue)
    }
}