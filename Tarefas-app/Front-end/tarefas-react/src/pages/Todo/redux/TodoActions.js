import axios from 'axios';

const URL = 'https://localhost:5001/api/todo';

export const changeDescription = (event) => ({
    type:'DESCRIPTION_CHANGED',
    payload: event.target.value
});

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `/description/${description}` : '';
        axios.get(`${URL}${search}`)
            .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}));
    }

}

export const add = (description) => {

        return dispatch => {
            axios.post(URL, { description })
                .then(resp => dispatch({ type: 'TODO_CLEAR', payload: resp.data }))
                .then(resp => dispatch(search()));
        }
}

export const maskAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}`, {...todo, done:'true'})
            .then(resp => dispatch(search()));
    }
}

export const maskAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}`, {...todo, done:'false'})
            .then(resp => dispatch(search()));
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo.id}`)
            .then(resp => dispatch(search()));
    }
}

export const clear = () =>{
    return [{ type: 'TODO_CLEAR' }, search()];
}

