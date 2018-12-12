import {
    FACEBOOK_LOGIN,
} from '../constants/ActionTypes'

const initialState = 
    {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
    }


export default function user(state = initialState, action) {
    switch (action.type) {
        case FACEBOOK_LOGIN:
            //  console.log(action.user)
            return action.user
        default:
            return state
    }
}