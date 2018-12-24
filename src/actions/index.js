import * as types from '../constants/ActionTypes'
import axios from 'axios'

const API = 'http://localhost:8080/api/'


export const facebookLogin = (user) => ({type: types.FACEBOOK_LOGIN, user})

export const tapMessage = (id) => ({type: types.TAP_MESSAGE, id})

export const like = (id) => ({type: types.LIKE, id})
export const bookmark = (id) => ({type: types.BOOKMARK, id})
export const comment = (text) => ({type: types.COMMENT, text})

export const follow = (targetID) => ({type: types.FOLLOW, targetID})

export const post = (data) => ({type: types.POST, data})

export const explore = (data) => ({
  type: types.EXPLORE, 
  payload: data
})

export const dish = (data) => ({
  type: types.DISH,
  payload: data
})

export const chef = (data) => ({
  type: types.CHEF,
  payload: data
})

export const edit = (data) => ({
  type: types.EDIT,
  payload: data
})

//API FETCHER

export const fetchExplore = (data) => {
  return (dispatch) => {
    return axios.post(API + 'explore', {data})
      .then((response) => {
        dispatch(explore(response.data))
      })
      .catch((err) => {
        throw(err)
      })
    }
}

export const fetchDish = (data) => {
  return (dispath) => {
    return axios.post(API + 'dish', {data})
      .then(response => {
        dispath(dish(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchChef = (data) => {
  return (dispath) => {
    return axios.post(API + 'dish', {data})
      .then(response => {
        dispath(chef(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchLike = (data) => {
  return (dispath) => {
    return axios.post(API + 'dish', {data})
      .then(response => {
        dispath(like(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchBookmark = (data) => {
  return (dispath) => {
    return axios.post(API + 'bookmark', {data})
      .then(response => {
        dispath(bookmark(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchFollow = (data) => {
  return (dispath) => {
    return axios.post(API + 'follow', {data})
      .then(response => {
        dispath(follow(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}


export const fetchComment = (data) => {
  return (dispath) => {
    return axios.post(API + 'comment', {data})
      .then(response => {
        dispath(comment(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}

export const fetchPost = (data) => {
  return (dispath) => {
    return axios.post(API + 'comment', {data})
      .then(response => {
        dispath(comment(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}