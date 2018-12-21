import { combineReducers } from 'redux'
import user from './user'
import recipes from './recipes'
import messages from './messages'

const rootReducer = combineReducers({
    user,
    recipes,
    messages
})

export default rootReducer