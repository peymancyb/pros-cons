export function renderIf(condition, trueComponent, falseComponent){
    if(condition){
        return trueComponent
    }
    return (falseComponent) ? falseComponent : null;
}