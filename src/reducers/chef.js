import {
  LIKE,
  BOOKMARK,
  FOLLOW,
  CHEF,
  CHEF_PROFILE,
  CHEF_RECIPES,
  CHEF_SNAPS,
  CHEF_BOOKMARKS
} from '../constants/ActionTypes'

const initialStae = {
  chef: {
    id: null,
    name: "",
    description: "",
    followed: false,
    picture: ""
  },
  recipes: [
  ],
  snaps: [
  ],
  bookmarks: [
  ],
}

export default function dish(state = initialStae, action) {
  switch (action.type) {
    case LIKE:
      return {
        ...state,
        recipes: state.recipes.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            liked: !recipe.liked,
            hearts: recipe.liked === true ? Number(recipe.hearts)-1 : Number(recipe.hearts)+1,
          } : recipe
        )), 
        bookmarks: state.bookmarks.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            liked: !recipe.liked,
            hearts: recipe.liked === true ? Number(recipe.hearts)-1 : Number(recipe.hearts)+1,
          } : recipe
        ))
      }
    case BOOKMARK:
      return {
        ...state,
        recipes: state.recipes.map(recipe => (
          recipe.id === action.id ?
          {
            ...recipe,
            bookmark: !recipe.bookmark
          } : recipe
        ))
      }
    case FOLLOW: 
      console.log(action)
      return {
        ...state,
        chef: {
          ...state.chef,
          followed: action.payload == state.chef.id ? !state.chef.followed : state.chef.followed
        }
      }
    case CHEF:
      return action.payload

    case CHEF_PROFILE: 
      console.log(action.payload)
      return {
        ...state,
        chef: {
          ...state.chef,
          id: action.payload.id,
          name: action.payload.name,
          picture: action.payload.picture,
        }
        
      }

    case CHEF_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case CHEF_SNAPS:
      return {
        ...state,
        snaps: action.payload
      }

    case CHEF_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload
      }
    default:
      return state
  }
}