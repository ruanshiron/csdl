import React from 'react' 
import ReactDOM from 'react-dom' 
import App from './components/App' 
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import * as serviceWorker from './serviceWorker' 

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(    
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
) 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister() 
