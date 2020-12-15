import {combineReducers} from 'redux'


const defaultState = {
    user: {}
}

function userReducer (state=defaultState.user, action) {
    switch(action.type){
        case "FETCH_USER":
            return action.payload

        case "CREATE_TIMESHEET":
            return action.payload

        case "CREATE_CLIENT":
            console.log(state)
            // return [...state, action.payload ]   
        

        default:
            return state 
    }
}
const rootReducer = combineReducers({
    user: userReducer
})



export default rootReducer