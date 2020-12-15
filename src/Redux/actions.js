import {FETCH_USER} from './actionType'
import {CREATE_TIMESHEET} from './actionType'
import {CREATE_CLIENT} from './actionType'


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


export function createTimesheet (newTimesheet, clientId, projectId) {
     
    return function(dispatch, getState) {
         
        fetch('http://localhost:3000/api/v1/timesheets', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTimesheet),
          }) 
        .then(response => response.json())
        .then(newTimesheetOBj => { 
                let prevState = getState()
                let clientIndex = prevState.user.clients.findIndex(client => client.id === clientId)
                let projectIndex = prevState.user.clients[clientIndex].projects.findIndex(project => project.id === projectId)
                prevState.user.clients[clientIndex].projects[projectIndex].timesheets.push(newTimesheetOBj)
                console.log(prevState)
                dispatch({type:CREATE_TIMESHEET, payload:prevState})
                console.log(newTimesheetOBj)
            });
    }   
    
}

export function createClient (newClient) {
     
    return function(dispatch, getState) {
         
        fetch('http://localhost:3000/api/v1/clients', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClient),
          }) 
        .then(response => response.json())
        .then(newClientObj => { 
                let prevState = getState()
                prevState.user.clients.push(newClientObj)
                dispatch({type:CREATE_CLIENT, payload:prevState})
            });
    }   
    
}