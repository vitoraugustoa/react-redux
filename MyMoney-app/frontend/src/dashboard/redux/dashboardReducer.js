const INITIAL_STATE = {
    credit: 0,
    debt: 0,
}

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'BILLING_SUMMARY_FETCHED':
            return { ...state,  credit: action.payload.data.credits, debt: action.payload.data.debts }
        default:
            return state
    } 
}