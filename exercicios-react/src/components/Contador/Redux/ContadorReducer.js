const INITIAL_STATE = {
    step: 1,
    number: 0,
}

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case 'INC':
            console.log("incReducer");
            return { ...state, number: state.number + state.step };
        case 'DEC':
        console.log("incDec");
            return { ...state, number: state.number - state.step };
        case 'STEP_CHANGED':
        console.log(action.payload);
            return { ...state, step: +action.payload }
        default:
            return state;
    }
}