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
        
            return {
                ...action.user,
            }
        default:
            return state
    }
}