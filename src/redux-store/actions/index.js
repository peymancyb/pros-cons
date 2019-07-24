import types from 'redux-store/types';

export function handleProsChange(newTextValue) {
    return {
        type: types.CHANGE_PROS,
        newTextValue
    }
}

export function handleConsChange(newTextValue) {
    return {
        type: types.CHANGE_CONS,
        newTextValue
    }

}

export function addPros(data) {
    return {
        type: types.ADD_PROS,
        data
    }

}

export function addCons(data) {
    return {
        type: types.ADD_CONS,
        data
    }
}

export function removePros(index) {
    return {
        type: types.REMOVE_PROS,
        index
    }
}

export function removeCons(index) {
    return {
        type: types.REMOVE_CONS,
        index
    }
}
