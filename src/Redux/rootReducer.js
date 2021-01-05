import {combineReducers} from 'redux'


const defaultState = {
    user: {}
}

function userReducer (state=defaultState.user, action) {
    switch(action.type){
        case "FETCH_USER":
            return action.payload

        case "CREATE_TIMESHEET":
            return {...state, ...action.payload }

        case "CREATE_CLIENT":
            return {...state, ...action.payload }

        case "CREATE_PROJECT":    
            return {...state, ...action.payload } 

        case "UPDATE_PROJECT_COMP":    
            return {...state, ...action.payload }

        case "DELETE_PROJECT":    
            return {...state, ...action.payload }

        case "CREATE_USER":    
            return {...state, ...action.payload }

        case "DELETE_TIMESHEET":    
            return {...state, ...action.payload }

        default:
            return state 
    }
}
const rootReducer = combineReducers({
    user: userReducer
})



export default rootReducer