import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Proptypes from 'prop-types'
import Home from './Home'
import Dish from '../containers/Dish'
import Header from '../containers/Header'
import Explore from '../containers/Explore';
import Chef from '../containers/Chef';
import Edit from '../containers/Edit'
// import Ingredient from './Ingredient';
// import Dashboard from './Dashboard';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Router>
          <Fragment>
            <CssBaseline/>
            
            <Header/>

            <Route path='/' exact component={Home}/>
            <Route path='/explore' component={Explore}/>
            <Route path='/dish/:id' component={Dish}/>
            <Route path='/chef/:id' component={Chef}/>
            <Route path='/edit/:id' component={Edit}/>
            {/* <Route path='/ingredient' component={Ingredient}/>
            <Route path='/dashboard' component={Dashboard}/> */}
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
