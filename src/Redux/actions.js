import {FETCH_USER} from './actionType'

export function getUserFromApi () {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/users/1') 
        .then(response => response.json())
        .then(currentUserObj => {
                dispatch({type:FETCH_USER, payload:currentUserObj})
                console.log(currentUserObj)
            });
    }
    
}