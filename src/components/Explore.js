import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import ExploreItem from './ExploreItem';

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
});

class Explore extends Component {
  handleMoreRecipe() {
    this.props.actions.exploreMoreRecipe(null)
  }

  render() {
    const { classes, recipes, actions } = this.props;

    return (

      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40}>
            {
              recipes.map(recipe => (
                <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={4}>
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
}

export default withStyles(styles)(Explore)
