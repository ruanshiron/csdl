import React, { Component } from 'react'
import classNames from 'classnames'
import { Card, CardMedia, Grid, Avatar, Typography, Button, Divider, CardActionArea} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import ExploreItem from './RecipeItem';

function RecipesContainer(props) {
  const {recipes, actions} = props
  return (
    <Grid container spacing={8} >
      {
        recipes.map((recipe, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
            <ExploreItem dish={recipe} actions={actions}/>
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



const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  grid: {
    justify: 'center',
    direction:'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')] : {
      justify: 'flex-start',
      direction:'row',
      alignItems: 'flex-start',
    }
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
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing.unit,
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
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      marginLeft: theme.spacing.unit * 4,
      marginRight: theme.spacing.unit * 4,
    }
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
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 140,
    height: 140,
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    objectFit: 'cover',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  badge: {
    top: 20,
    right: 1,
  },
});
  

class Chef extends Component {
  state = {
    value: 0,
  };

  handleChange = (value) => {
    this.setState({ value });
  }

  handleFollow = (target) => {
    this.props.actions.follow(target)
  }

  componentDidMount() {
    document.title = "Chef"
    console.log(this.props.match)
    if (this.props.match.params.id === "1215736495246283") console.log('fdfd')
  }

  componentWillMount() {
    console.log('ds')
  }

  render() {
    const { classes, actions } = this.props;
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
                      {index===0 && <><EditIcon/> 12</>}
                      {index===1 && <><PhotoCameraIcon/> 12</>}
                      {index===2 && <><BookmarkIcon/> 12</>}  
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
          
          {value===0 &&<RecipesContainer recipes={recipes} actions={actions}/>}
          {value===1 &&<SnapsContainer snaps={snaps}/>}
          {value===2 &&<RecipesContainer recipes={bookmarks} actions={actions}/>}

          
        </div>
      </main>

    ) 
  }
}

Chef.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Chef) 
