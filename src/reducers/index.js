import { combineReducers } from 'redux'
import user from './user'
import explore from './explore'
import dish from './dish'
import messages from './messages'
import chef from './chef'
import edit from './edit'

const rootReducer = combineReducers({
    user,
    explore,
    dish,
    chef,
    messages,
    edit
})

export default rootReducer