export function inc() {
    console.log("inc");
    return { type: 'INC' }
}

export function dec() {
    console.log("dec");
    return { type: 'DEC' }
}

export function stepChanged(e) {
    console.log("changed");
    return {
        type: 'STEP_CHANGED',
        payload: e.target.value,
    }
}