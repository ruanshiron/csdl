import * as types from '../constants/ActionTypes'
import axios from 'axios'


export const facebookLogin = (user) => ({type: types.FACEBOOK_LOGIN, user})

export const tapMessage = (id) => ({type: types.TAP_MESSAGE, id})

export const like = (id) => ({type: types.LIKE, id})
export const bookmark = (id) => ({type: types.BOOKMARK, id})
export const comment = (text) => ({type: types.COMMENT, text})

export const follow = (targetID) => ({type: types.FOLLOW, targetID})

export const explore = (data) => ({
  type: types.EXPLORE, 
  payload: data
})

export const dish = (data) => ({
  type: types.DISH,
  payload: data
})

//API FETCHER

export const fetchExplore = (mode) => {
  return (dispatch) => {
    return axios.get('http://localhost:8080/api/test', {mode})
      .then((response) => {
        dispatch(explore(response.data))
      })
      .catch((err) => {
        throw(err)
      })
    }
}

export const fetchDish = (id) => {
  return (dispath) => {
    return axios.get('http://localhost:8080/api/test', {id})
      .then(response => {
        dispath(dish(response.data))
      })
      .catch(err => {
        throw(err)
      })
  }
}