import React, { Component } from 'react'
import Header from './components/Header' 
import RecipeReviewCard from './components/RecipeReviewCard'
import { Paper, Grid, Card, CardHeader, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'

const styles = theme => ({
  root: {
    position: 'fixed',
    marginTop: 60,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 480,
    width: 234,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    boxShadow: 'none'
  },

  section: {
    width: 943,
    marginTop: 80,
    boxShadow: 'none'
  }
})

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header/>

        <Grid container justify='center'>
          <Paper className={classes.section} justify='center'>
            <Grid container spacing={8}>
              <Grid item sm={8} xs={8}>
                <RecipeReviewCard dish={'Rau muống luộc'} chef={'Nguyễn Thế Vinh'} pics={'/resource/pictures/3_650384.jpg'}/>
                <RecipeReviewCard dish={'Thịt rang ruột ngựa'} chef={'Phùng Thế Hùng'} pics={'/resource/pictures/Cach-lam-mon-long-heo-xao-nghe-2-1533718709-579-width500height282.jpg'}/>
                <RecipeReviewCard dish={'Xò xào xúc xích'} chef={'Lã Ngọc Dương'} pics={'/resource/pictures/123.jpg'}/>
                <RecipeReviewCard dish={'Lòng lợn, tái nầm'} chef={'Ninh Mạnh Hùng'} pics={'/resource/pictures/hqdefault.jpg'}/>
                <RecipeReviewCard dish={'Rau muống luộc'} chef={'Nguyễn Thế Vinh'} pics={'/resource/pictures/Cach-lam-mon-long-heo-xao-nghe-2-1533718709-579-width500height282.jpg'}/>
              </Grid>
              <Grid item sm={4} xs={4}>
                <Paper className={classes.root}>
                  <Grid container spacing={0}>
                    <Grid>
                      <Card style={{boxShadow:'none'}}>
                        <CardHeader
                        avatar={
                          <Avatar aria-label="Recipe">
                            V
                          </Avatar>
                        }
                        title='Nguyễn Thế Vinh'
                        subheader='3 star'>
                        </CardHeader>
                      </Card>
                    </Grid>
                    <Grid>
                      <Card style={{boxShadow:'none'}}>
                          <CardHeader
                          subheader='Today'>
                          </CardHeader>
                        </Card>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    ) 
  }
}

App.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(App) 
