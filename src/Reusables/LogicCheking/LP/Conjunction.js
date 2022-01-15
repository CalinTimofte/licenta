export default class Conjunction{
    constructor(atomicProp1, atomicProp2){
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