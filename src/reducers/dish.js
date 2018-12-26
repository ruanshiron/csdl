import {
  LIKE,
  COMMENT,
  BOOKMARK,
  FOLLOW,
  DISH,
  DISH_RECIPE,
  DISH_INGREDIENTS,
  DISH_STEPS,
  DISH_CHEF,
  DISH_SNAPS,
  DISH_COMMENTS,
} from '../constants/ActionTypes'

const initialStae = {
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
    case LIKE:
      return {
        ...state,
        recipe: state.recipe.id !== action.id ? state.recipe :
          {
            ...state.recipe,
            liked: !state.recipe.liked,
            hearts: !state.recipe.liked === true? state.recipe.hearts+1 : state.recipe.hearts-1,
          }
      }
    case BOOKMARK:
      return {
        ...state,
        recipe: state.recipe.id !== action.id ? state.recipe :
          {
            ...state.recipe,
            did_bookmark: !state.recipe.did_bookmark,
          }
      }
    case FOLLOW: 
      return {
        ...state,
        recipe:
          {
            ...state.recipe,
            chef: {
              ...state.recipe.chef,
              followed: !state.recipe.chef.followed,
            }
          }
      }
    case COMMENT:
      return {
        ...state,
        comments: [
          {chef: {id: null, picture:"https://img-global.cpcdn.com/005_steps/ff1a4f8e0519f866/480x360cq70/photo.jpg"}, text: action.text, created_at: Date()},
          ...state.comments,
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
      Object.keys(action.payload).map((a) => {
        console.log()
      })

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
      return {
        ...state,
        recipe: {
          ...state.recipe,
          chef: {
            ...action.payload
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