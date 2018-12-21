import * as types from '../constants/ActionTypes'
import axios from 'axios'


export const facebookLogin = (user) => ({type: types.FACEBOOK_LOGIN, user})

export const tapMessage = (id) => ({type: types.TAP_MESSAGE, id})

export const likeRecipe = (id) => ({type: types.LIKE_RECIPE, id})
export const bookmarkRecipe = (id) => ({type: types.BOOKMARK_RECIPE, id})

export const exploreMoreRecipe = (data) => ({
  type: types.EXPLORE_MORE_RECIPE, 
  payload: data
})

export const fetchRecipe = ids => {
  return (dispatch) => {
    return axios.get('http://localhost:8080/api/test', {hihi: 'test'})
      .then((response) => {
        dispatch(exploreMoreRecipe(response.data))
      })
      .catch((err) => {
        throw(err)
      })
    }
}