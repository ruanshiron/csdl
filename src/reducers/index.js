import { combineReducers } from 'redux'
import user from './user'
import explore from './explore'
import dish from './dish'
import messages from './messages'

const rootReducer = combineReducers({
    user,
    explore,
    dish,
    messages
})

export default rootReducer