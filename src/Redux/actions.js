import {FETCH_USER} from './actionType'
import {CREATE_TIMESHEET} from './actionType'
import {CREATE_CLIENT} from './actionType'
import {CREATE_PROJECT} from './actionType'
import {UPDATE_PROJECT_COMP} from './actionType'
import {DELETE_PROJECT} from './actionType' 


export function getUserFromApi () {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/users/1') 
        .then(response => response.json())
        .then(currentUserObj => {
                dispatch({type:FETCH_USER, payload:currentUserObj})
                localStorage.setItem("user", JSON.stringify(currentUserObj))
               
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
                let prevState = {...getState()}
                let clientIndex = prevState.user.clients.findIndex(client => client.id === clientId)
                let projectIndex = prevState.user.clients[clientIndex].projects.findIndex(project => project.id === projectId)
                prevState.user.clients[clientIndex].projects[projectIndex].timesheets.push(newTimesheetOBj)
                prevState.user.clients[clientIndex].projects[projectIndex].project_total_hours += newTimesheetOBj.hours
                let total_earned = newTimesheetOBj.hours*prevState.user.clients[clientIndex].projects[projectIndex].hourly_fee
                prevState.user.clients[clientIndex].projects[projectIndex].project_total_earned += total_earned
                prevState.user.clients[clientIndex].client_incomplete_earned += total_earned
                console.log(prevState.user)
                dispatch({type:CREATE_TIMESHEET, payload:prevState.user})
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
                let prevState = {...getState()}
                prevState.user.clients.push(newClientObj)
                dispatch({type:CREATE_CLIENT, payload:prevState.user})
            });
    }      
}

export function createProject (newProject, clientId) {
     
    return function(dispatch, getState) {
         
        fetch('http://localhost:3000/api/v1/projects', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
          }) 
        .then(response => response.json())
        .then(newProjectObj => { 
                let prevState = {...getState()}
                let clientIndex = prevState.user.clients.findIndex(client => client.id === clientId)
                prevState.user.clients[clientIndex].projects.push(newProjectObj)
                dispatch({type:CREATE_PROJECT, payload:prevState.user})
            });
    }     
}

export function updateProjectCompletion (updatedProject, projectId, clientId) {
     
    return function(dispatch, getState) {
        fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
            method: 'PATCH', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({complete: updatedProject}),
          })    
        .then(response => response.json())
        .then(updatedProjectObj => { 
                console.log(updatedProjectObj)
                let prevState = {...getState()}
                let clientIndex = prevState.user.clients.findIndex(client => client.id === clientId)
                let projectIndex = prevState.user.clients[clientIndex].projects.findIndex(project => project.id === projectId)
                prevState.user.clients[clientIndex].projects.splice(projectIndex,1, updatedProjectObj)
                prevState.user.clients[clientIndex].client_incomplete_earned -= updatedProjectObj.project_total_earned
                prevState.user.clients[clientIndex].client_completed_earned += updatedProjectObj.project_total_earned
                dispatch({type:UPDATE_PROJECT_COMP, payload:prevState.user})
            });
    }   
    
}

export function deleteProject (projectId, clientId,project_amt) {
     
    return function(dispatch, getState) {
        fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
            },
          })    
        .then(response => response.json())
        .then(deletedProjObj => { 
                console.log(getState())
                let prevState = {...getState()}
                let clientIndex = prevState.user.clients.findIndex(client => client.id === clientId)
                let projectIndex = prevState.user.clients[clientIndex].projects.findIndex(project => project.id === projectId)
                prevState.user.clients[clientIndex].projects.splice(projectIndex,1)
                if (deletedProjObj.complete === true ) {
                  prevState.user.clients[clientIndex].client_completed_earned-=project_amt
                }
                else if (deletedProjObj.complete === false) {
                  prevState.user.clients[clientIndex].client_incomplete_earned-=project_amt
                }
                console.log(prevState)
                dispatch({type:DELETE_PROJECT, payload:prevState.user})
            });
    }   
    
}

