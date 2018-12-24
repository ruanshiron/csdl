import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Home extends Component {
  
  //Mack Explore to Hone Page
  componentWillMount() {
    this.props.history.push('/explore')
  }

  render() {
    const { classes } = this.props;

    return (
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40} justify='center'>
            <Grid item>
              <Typography variant='h1'>404</Typography>
            </Grid>  
          </Grid>
        </div>
      </main>

    ) 
  }
}

Home.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Home) 
