import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import ExploreItem from './RecipeItem';

const styles = theme => ({
  layout: {
    marginTop: 50,
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(960 + theme.spacing.unit * 3 * 2)]: {
      width: 960,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },  
  button: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit*2,
  },
});

class Explore extends Component {
  state = {
    value: 1,
  }

  handleMoreRecipe() {
    this.props.actions.fetchExplore(2)
  }

  handleChangeValue(index) {
    if (index === this.state.value) {
      //TODO renew reducer

    }

    this.setState ({
      value: index
    })
  }

  render() {
    const { classes, explore, actions } = this.props
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
                  <ExploreItem dish={recipe} actions={actions}></ExploreItem>
                </Grid>
              ))
            }
            { value === 1 &&
              explore.hot.map((recipe, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <ExploreItem dish={recipe} actions={actions}></ExploreItem>
                </Grid>
              ))
            }
            { value === 2 &&
              explore.new.map((recipe, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <ExploreItem dish={recipe} actions={actions}></ExploreItem>
                </Grid>
              ))
            }
          </Grid>
          <Grid container justify="center" style={{padding: 40}}>
            <Button 
              className={classes.moreButton}
              onClick={() => this.handleMoreRecipe()}
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
  explore: Proptypes.array.isRequired
}

export default withStyles(styles)(Explore)
