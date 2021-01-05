import {FETCH_USER} from './actionType'
import {CREATE_TIMESHEET} from './actionType'
import {CREATE_CLIENT} from './actionType'
import {CREATE_PROJECT} from './actionType'
import {UPDATE_PROJECT_COMP} from './actionType'
import {DELETE_PROJECT} from './actionType' 
import {DELETE_TIMESHEET} from './actionType' 
import {CREATE_USER} from './actionType' 




export function getUserFromApi (loginUser) {
    return function(dispatch) {
    //  debugger
      fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      
      },
      body: JSON.stringify(loginUser)
      })
      .then(r => r.json())
      .then(loggedInUser => {
        console.log(loggedInUser)
        localStorage.setItem("token", loggedInUser.jwt)
        dispatch({type:FETCH_USER, payload:loggedInUser.user})
       
      })
    }
}


export function addUser (newUser) {
  return function(dispatch) {
  //  debugger
    fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    
    },
    body: JSON.stringify(newUser)
    })
    .then(r => r.json())
    .then(newUserObj => {
      console.log(newUserObj)
      localStorage.setItem("token", newUserObj.jwt)
      dispatch({type:CREATE_USER, payload:newUserObj.user})
     
    })
  }
}


export function createTimesheet (newTimesheet, clientId, projectId) {
    return function(dispatch, getState) {
      const token = localStorage.getItem('token');
        fetch('http://localhost:3000/api/v1/timesheets', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              "Accepts": "application/json",
              "Authorization": `Bearer ${token}`
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
      const token = localStorage.getItem('token');
        fetch('http://localhost:3000/api/v1/clients', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              "Accepts": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newClient),
          }) 
        .then(response => response.json())
        .then(newClientObj => { 
                console.log(newClientObj)
                let prevState = {...getState()}
                prevState.user.clients.push(newClientObj)
                dispatch({type:CREATE_CLIENT, payload:prevState.user})
            });
    }      
}

export function createProject (newProject) {
     
    return function(dispatch, getState) {
      const token = localStorage.getItem('token');
        fetch('http://localhost:3000/api/v1/projects', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              "Accepts": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newProject),
          }) 
        .then(response => response.json())
        .then(newProjectObj => { 
                console.log(newProjectObj)
                let prevState = {...getState()}
                let clientIndex = prevState.user.clients.findIndex(client => client.id === newProjectObj.client_id)
                prevState.user.clients[clientIndex].projects.push(newProjectObj)
                dispatch({type:CREATE_PROJECT, payload:prevState.user})
            });
    }     
}

export function updateProjectCompletion (updatedProject, projectId, clientId) {
     
    return function(dispatch, getState) {
      const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
            method: 'PATCH', 
            headers: {
              'Content-Type': 'application/json',
              "Accepts": "application/json",
              "Authorization": `Bearer ${token}`
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
      const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              "Accepts": "application/json",
              "Authorization": `Bearer ${token}`
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

export function deleteTimesheet (delProject, clientId,delTimesheet) {
     
  return function(dispatch, getState) {
    const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/api/v1/timesheets/${delTimesheet.id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            "Accepts": "application/json",
            "Authorization": `Bearer ${token}`
          },
        })    
      .then(response => response.json())
      .then(deletedTimesheetObj => { 
              let prevState = {...getState()}
              let clientIndex = prevState.user.clients.findIndex(client => client.id === clientId)
              let projectIndex = prevState.user.clients[clientIndex].projects.findIndex(project => project.id === delProject.id)
              let timesheetIndex = prevState.user.clients[clientIndex].projects[projectIndex].timesheets.findIndex(timesheet => timesheet.id === delTimesheet.id)
              prevState.user.clients[clientIndex].projects[projectIndex].project_total_hours -= delTimesheet.hours
              let total_earned = delTimesheet.hours*delProject.hourly_fee
              prevState.user.clients[clientIndex].projects[projectIndex].project_total_earned -= total_earned
              prevState.user.clients[clientIndex].projects[projectIndex].timesheets.splice(timesheetIndex,1)
              if (delProject.complete === true ) {
                prevState.user.clients[clientIndex].client_completed_earned-=delTimesheet.hours
              }
              else if (delProject.complete === false) {
                prevState.user.clients[clientIndex].client_incomplete_earned-=delTimesheet.hours
              }
              console.log(prevState)
              dispatch({type:DELETE_TIMESHEET, payload:prevState.user})
          });
  }   
  
}

