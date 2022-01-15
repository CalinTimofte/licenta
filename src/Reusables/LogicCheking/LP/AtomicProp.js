export default class AtomicProp{
    constructor(content, truthValue){
        this._content = content;
        this._truthValue = truthValue;
    }

    get content(){
        return this._content;
    }

    set content(updatedContent){
        this._content = updatedContent;
    }

    get truthValue(){
        return this._truthValue;
    }

    set truthValue(updatedTruthValue){
        this._truthValue = updatedTruthValue;
    }
}