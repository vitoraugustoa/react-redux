import axios from 'axios';
import ApiAuthenticationUrl from '../../consts';

export function login(userLoginObject) {
    return submit(userLoginObject, `${ApiAuthenticationUrl}/login`)
}

export function singup(userObject) {
    return submit(userObject, `${ApiAuthenticationUrl}/CreateUser`)
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
} 

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([{ type: 'USER_FETCHED', payload: resp.data }])
            })
            .catch(e => {
                console.log(e);
            });
    }
}


