import {
  EDIT, 
  IMAGE
} from '../constants/ActionTypes'

const initialStae = {
  id: null,
  image: "",
  name: "",
  description: "",
  ingredients: [
    "",
  ],
  steps: [
    {
      text: "",
      snaps: ["", "", ""],
    }
  ]
}

export default function dish(state = initialStae, action) {
  switch (action.type) {
    case EDIT:
      return state
    case IMAGE:
      return state
    default:
      return state
  }
}