import * as types from '../constants/ActionTypes'

export const facebookLogin = (user) => ({type: types.FACEBOOK_LOGIN, user})
export const likeRecipe = (id) => ({type: types.LIKE_RECIPE, id})
export const exploreMoreRecipe = (ids) => ({type: types.EXPLORE_MORE_RECIPE, ids})