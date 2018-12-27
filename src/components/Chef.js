import React, { Component } from 'react'
import classNames from 'classnames'
import { Card, CardMedia, Grid, Avatar, Typography, Button, Divider, CardActionArea} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import ExploreItem from './RecipeItem'
import styles from '../assets/chefStyles'

function RecipesContainer(props) {
  const {recipes, actions, user} = props
  return (
    <Grid container spacing={8} >
      {
        recipes.map((recipe, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
            <ExploreItem dish={recipe} actions={actions} user={user}/>
          </Grid>
        )) 
      }
    </Grid>
  )
}

RecipesContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}

function SnapsContainer(props) {
  const {snaps} = props
  return (
    <Grid container spacing={8}>
      {
        snaps.map((snap, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
            <Card square elevation={0}>
              <CardActionArea>
                <CardMedia image={snap.src} style={{paddingTop: '100%', marginTop : 0}} />
              </CardActionArea>
            </Card>
          </Grid>
        )) 
      }
    </Grid>
  )
}

SnapsContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}



class Chef extends Component {
  state = {
    value: 0,
  };

  handleChange = (value) => {
    this.setState({ value });
  }

  handleFollow = (active) => {
    this.props.actions.fetchFollow(this.props.chef.chef.id, this.props.user.userID, this.props.chef.chef.followed)
  }

  componentWillMount() {
    const id = this.props.match.params.id
    console.log(this.props.match.params.id)

    this.props.actions.fetchChefProfile(id)
    this.props.actions.fetchChefRecipes(id)
    this.props.actions.fetchChefSnaps(id)
    this.props.actions.fetchChefBookmarks(id)
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    document.title = this.props.chef.chef.name
  }



  render() {
    const { classes, actions, user } = this.props;
    const { value } = this.state;
    const tabs = ["Công thức", "Snaps", "Bookmarks"]

    const {chef, recipes, snaps, bookmarks} = this.props.chef

    return (
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <div className={classes.heroContent}>
            <Grid className={classes.grid} container spacing={16} >
              <Grid item xs={12} sm={3}>
                <Grid container justify='center'>
                <Avatar
                  className={classNames(classes.avatar, classes.bigAvatar)}
                  src={chef.picture}
                />
                </Grid>
              </Grid>  
              <Grid item>
              <Grid 
                justify='center' 
                container
                direction="column" 
                spacing={16}
              >
                <Grid item>
                  <Typography 
                    style={{marginLeft: 24}}
                    variant="h3" 
                  >
                    {chef.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography 
                    style={{marginLeft: 24}}
                    variant="subheading" 
                    gutterBottom
                  >
                    {chef.description}
                  </Typography>
                </Grid>
                <Grid item>
                {
                  tabs.map((tab, index) => (
                    <Button 
                      key={index}
                      variant="extendedFab" 
                      aria-label={tab}
                      className={classes.button}
                      color={value===index ? "secondary" : "inherit"}
                      onClick={() => this.handleChange(index)}
                    >
                      {index===0 && <><EditIcon/> {this.props.chef.recipes.length}</>}
                      {index===1 && <><PhotoCameraIcon/> {this.props.chef.snaps.length}</>}
                      {index===2 && <><BookmarkIcon/> {this.props.chef.bookmarks.length}</>}  
                    </Button>
                  ))
                }
                <Button variant="fab" aria-label="Delete" className={classes.button} onClick={this.handleFollow}>
                  {chef.followed ? <NotificationsIcon color="primary"/> : <NotificationsIcon/>}
                </Button>
              </Grid>
            </Grid>
              </Grid>
                
            </Grid>
          </div>
          <Divider style={{margin:20}}/>
          
          {value===0 &&<RecipesContainer recipes={recipes} actions={actions} user={user}/>}
          {value===1 &&<SnapsContainer snaps={snaps}/>}
          {value===2 &&<RecipesContainer recipes={bookmarks} actions={actions} user={user}/>}

          
        </div>
      </main>

    ) 
  }
}

Chef.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Chef) 
