import TokenService from '../services/token-service'
import config from '../config'

const AllowanceApiService = {
  postLogin(login) {
    return fetch(`${config.API_BASE_URL}/logins`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postParent(parent) {
    return fetch(`${config.API_BASE_URL}/parents`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(parent),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postChild(child) {
    return fetch(`${config.API_BASE_URL}/children`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(child),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getParent(login_id) {
    return fetch(`${config.API_BASE_URL}/parents/${login_id}`, {
      method: 'GET',
      headers: {},
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getChild(login_id) {
    return fetch(`${config.API_BASE_URL}/children/${login_id}`, {
      method: 'GET',
      headers: {},
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getChildrenForParent(parent_id) {
    return fetch(`${config.API_BASE_URL}/parents/${parent_id}/children`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getTasksForChild(child_id) {
    return fetch(`${config.API_BASE_URL}/children/${child_id}/tasks`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateTaskForChild(task_id, newStatus) {
    return fetch(`${config.API_BASE_URL}/tasks/${task_id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        current_status: newStatus,
      })
    })
      .catch(error => {
        console.error({ error })
      })
  },
  deleteTask(task_id) {
    return fetch(`${config.API_BASE_URL}/tasks/${task_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error({ error })
      })
  },
  postTask(newTask) {
    return fetch(`${config.API_BASE_URL}/tasks/`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newTask.name,
        difficulty: newTask.difficulty,
        reward: newTask.reward,
        current_status: 'open',
        child_id: newTask.child_id
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  saveAccountAndLoginId(account, login_id) {
    window.sessionStorage.setItem('account', account)
    window.sessionStorage.setItem('login_id', login_id)
  },
  clearAccountAndLoginId() {
    window.sessionStorage.removeItem('account')
    window.sessionStorage.removeItem('login_id')
  }
}

export default AllowanceApiService