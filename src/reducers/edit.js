import {
  EDIT, 
  IMAGE,
  EDIT_RECIPE,
  EDIT_INGREDIENTS,
  EDIT_STEPS,
  EDIT_IMAGE,
  FACEBOOK_LOGIN,
  SUBMIT
} from '../constants/ActionTypes'

const initialStae = {
  isSubmit: false,
  userID: null,
  id: null,
  picture: null,
  name: "",
  description: "",
  ingredients: [
    "",
  ],
  steps: [
    {
      text: "",
      images: ["", "", ""],
    }
  ]
}

export default function dish(state = initialStae, action) {
  switch (action.type) {
    case EDIT:
      return state
    case IMAGE:
      return state
    case EDIT_RECIPE:
      console.log(action.payload)
      return {
        ...state,
        ...action.payload
      }
    case EDIT_INGREDIENTS:
      console.log(action.payload.length)
      return {
        ...state,
        ingredients: action.payload.length === 0 ? state.ingredients : action.payload
      }
    case EDIT_STEPS:
    console.log(action.payload)
      return {
        ...state,
        steps: action.payload['1'] === undefined ? state.steps:
          Object.keys(action.payload).map((a) => {
            return ({
              index: a,
              text: action.payload[a].text,
              images: action.payload[a].images[0] != null ? action.payload[a].images : ["","",""]
            })
          })
      }
    case EDIT_IMAGE:
        state.steps.map((step, index) => {
          if (index == action.payload.type.split('-')[1]) {
            console.log(step)
            step.images[action.payload.type.split('-')[2]] = action.payload.src
          }
        })
      return {
        ...state,
        picture: action.payload.type == 'picture' ? action.payload.src : state.picture,
      }
    case SUBMIT:
      console.log(action.payload)
      return {
        ...state,
        isSubmit: action.payload
      }
    
    case FACEBOOK_LOGIN:
      return {
        ...state,
        userID: action.user.userID
      }
    default:
      return state
  }
}