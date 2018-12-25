import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import ExploreItem from './RecipeItem';
import styles from '../assets/exploreStyles'

class Explore extends Component {
  state = {
    value: 1,
  }

  handleMoreRecipe(value) {
    this.props.actions.fetchExplore({userID: this.props.user.userID, value})
  }

  componentDidMount() {
    if (this.props.explore.didMount === false) {
      this.props.actions.fetchExplore({userID: this.props.user.ID, value: 0})
      this.props.actions.fetchExplore({userID: this.props.user.ID, value: 1})
      this.props.actions.fetchExplore({userID: this.props.user.ID, value: 2})
    }
    this.props.explore.didMount = true
  }

  handleChangeValue(value) {
    if (value === this.state.value) {
      this.props.actions.fetchExplore({userID: this.props.user.userID, value})
    }

    this.setState ({
      value: value
    })
  }

  render() {
    const { classes, explore, actions, user } = this.props
    const { value } = this.state
    const tabs = ["Theo dõi", "HOT", "Mới"]

    return (

      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {
            tabs.map((tab,index) => (
              <Button 
                key={index}
                size="small" variant="extendedFab" 
                color={value===index ? "secondary" : "inherit"} 
                className={classes.button}
                onClick={() => this.handleChangeValue(index)}
              >
                {tab}
              </Button>
            ))
          }

          <Grid container spacing={40} direction='row'>
            { value === 0 &&
              explore.follow.map((recipe, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <ExploreItem dish={recipe} actions={actions} user={user}></ExploreItem>
                </Grid>
              ))
            }
            { value === 1 &&
              explore.hot.map((recipe, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <ExploreItem dish={recipe} actions={actions} user={user}></ExploreItem>
                </Grid>
              ))
            }
            { value === 2 &&
              explore.new.map((recipe, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <ExploreItem dish={recipe} actions={actions} user={user}></ExploreItem>
                </Grid>
              ))
            }
          </Grid>
          <Grid container justify="center" style={{padding: 40}}>
            <Button 
              className={classes.moreButton}
              onClick={() => this.handleMoreRecipe(value)}
            >
              Xem tiếp
            </Button>
          </Grid>
          
        </div>
      </main>

    ) 
  }
}

Explore.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Explore)
