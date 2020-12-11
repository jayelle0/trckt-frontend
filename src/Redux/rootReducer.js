import { useReducer } from 'react'
import {combineReducers} from 'redux'


const defaultState = {
    user: {}
}

function userReducer (state=defaultState.user, action) {
    switch(action.type){
        case "FETCH_USER":
            return action.payload

        default:
            return state 
    }
}
const rootReducer = combineReducers({
    user: userReducer
})



export default rootReducer