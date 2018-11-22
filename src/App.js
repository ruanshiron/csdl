import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Proptypes from 'prop-types'
import Home from './components/Home'
import Dish from './components/Dish'
import Header from './components/Header'
import Explore from './components/Explore';
import Chef from './components/Chef';

class App extends Component {

  render() {

    return (
      <Fragment>
        <CssBaseline/>

        <Header/>

        <Router>
          <Fragment>
            <Route path='/' exact component={Home}/>
            <Route path='/dish' component={Dish}/>
            <Route path='/explore' component={Explore}/>
            <Route path='/chef' component={Chef}/>
          </Fragment>
        </Router>
      </Fragment>
    ) 
  }
}

App.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default App 
