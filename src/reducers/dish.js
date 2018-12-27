import {
  LIKE,
  COMMENT,
  BOOKMARK,
  FOLLOW,
  SNAP,
  DISH,
  DISH_RECIPE,
  DISH_INGREDIENTS,
  DISH_STEPS,
  DISH_CHEF,
  DISH_SNAPS,
  DISH_COMMENTS,
  FACEBOOK_LOGIN,
} from '../constants/ActionTypes'

import {
  fetchDish
} from '../actions'

const initialStae = {
  isOwnedUser: false, 
  recipe: {
    id: null,
    name:"",
    description: "",
    picture: "",
    ingredients: [

    ],
    steps: [

    ],
    created_at: "",
    chef: {
      id: "",
      name: "",
      picture: "",
      followed: false
    },
    liked: false,
    did_bookmark: false,
    hearts: 0,
  },
  snaps: [
    
    ],
  comments: [
    
  ]
}
 
export default function dish(state = initialStae, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN:
      return initialStae

    case LIKE:
      return {
        ...state,
        recipe: state.recipe.id !== action.id ? {
            ...state.recipe,
            liked: !state.recipe.liked,
            hearts: Number(state.recipe.hearts),
        } :
          {
            ...state.recipe,
            liked: !state.recipe.liked,
            hearts: !state.recipe.liked === true? Number(state.recipe.hearts)+1 : Number(state.recipe.hearts)-1,
          }
      }
    case BOOKMARK:
      return {
        ...state,
        recipe: state.recipe.id !== action.id ? 
          {
            ...state.recipe,
            bookmark: !state.recipe.bookmark
          } :
          {
            ...state.recipe,
            did_bookmark: !state.recipe.did_bookmark,
          }
      }
    case FOLLOW: 
    console.log(action.payload)
      return {
        ...state,
        recipe:
          {
            ...state.recipe,
            chef: {
              ...state.recipe.chef,
              followed: action.payload == state.recipe.chef.id ? !state.recipe.chef.followed : state.recipe.chef.followed
            }
          }
      }
    case COMMENT:
      return {
        ...state,
        comments: [
          {
            chef: action.data.chef,
            text: action.data.text, 
            created_at: Date()
          },
          ...state.comments,
        ]
      }
    case SNAP: 
      return {
        ...state,
        snaps: [
          ...state.snaps,
          action.data.src
        ]
      }
    case DISH:
      return state
    case DISH_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ...action.payload
        }
      }
    case DISH_INGREDIENTS:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: [
            ...action.payload
          ]
        }
      }
    case DISH_STEPS:

      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: Object.keys(action.payload).map((a) => {
            return ({
              index: a,
              text: action.payload[a].text,
              images: action.payload[a].images[0] != null ? action.payload[a].images : []
            })
          })
        }
      }

    case DISH_CHEF:
      console.log(action.payload.userID.toString() === action.payload.data.id.toString())
      return {
        ...state,
        isOwnedUser: action.payload.userID.toString() === action.payload.data.id.toString(),
        recipe: {
          ...state.recipe,
          chef: {
            ...action.payload.data
          }
        }
      }
    
    case DISH_SNAPS:
      return {
        ...state,
        snaps: action.payload
      }
    case DISH_COMMENTS: 
      return {
        ...state,
        comments: action.payload
      }
    
    default:
      return state
  }
}