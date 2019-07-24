import { combineReducers } from 'redux';
import types from 'redux-store/types';
import _ from 'lodash';

function pros(defaultState = [{ value: '' }], actions ){
    const { type } = actions;
    switch(type){
        case types.ADD_PROS:
            const newItem = (actions.data) ? actions.data : { value: '' };
            const length = defaultState.length;
            const lastItem = defaultState[length - 1];
            return _.isEmpty(lastItem.value) ? [newItem, ...defaultState] : [...defaultState, newItem];
        case types.CHANGE_PROS:
            const { newTextValue } = actions;
            const { value, index } = newTextValue;
            let newTextState = [...defaultState];
            newTextState[index].value = value;
            return newTextState;
        case types.REMOVE_PROS:
                const itemIndex = actions.index;
                return defaultState.filter((element, index) => index !== itemIndex);;
        default:
            return defaultState
    }
}

function cons(defaultState = [{ value: '' }], actions ){
    const { type } = actions;
    switch(type){
        case types.ADD_CONS:
            const newItem = (actions.data) ? actions.data : { value: '' };
            const length = defaultState.length;
            const lastItem = defaultState[length - 1];
            return _.isEmpty(lastItem.value) ? [newItem, ...defaultState] : [...defaultState, newItem];
        case types.CHANGE_CONS:
            const { newTextValue } = actions;
            const { value, index } = newTextValue;
            let newTextState = [...defaultState];
            newTextState[index].value = value;
            return newTextState;
        case types.REMOVE_CONS:
                const itemIndex = actions.index;
                return defaultState.filter((element, index) => index !== itemIndex);;
        default:
            return defaultState
    }
}

export const combinedReducers = combineReducers({
    pros,
    cons
});
