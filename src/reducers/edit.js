import {
  EDIT, 
} from '../constants/ActionTypes'

const initialStae = {
  userID,
  id: null,
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
    default:
      return state
  }
}