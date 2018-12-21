import React, { Component } from 'react'
import classNames from 'classnames'
import { Badge, InputAdornment, Chip, Grid, Avatar, Typography, Button, Divider, Tab, Tabs, Card, CardMedia, TextField, CardActionArea } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import CardHeader from '@material-ui/core/CardHeader' 
import CardContent from '@material-ui/core/CardContent' 
import IconButton from '@material-ui/core/IconButton' 
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import SendIcon from '@material-ui/icons/Send'
import NotificationsIcon from '@material-ui/icons/Notifications'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  media: {
    height: 'auto',
    paddingTop: '56.25%', // 16:9
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
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(960 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    width: '100%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  avatar: {
    width: 24,
    height: 24,
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
  badge: {
    top: 20,
    right: 1,
  },
});

function TabContainer(props) {
  return (
    <CardContent>
      {props.children}
    </CardContent>
  );
}

TabContainer.Proptypes = {
  children: Proptypes.node.isRequired,
}


function RecipeContainer(props) {
  const { recipe } = props
  return (
    <>
    <CardContent>
      <Typography variant="headline" gutterBottom>Nguyên liệu</Typography>
        {
          recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
            <Chip label={ingredient} variant="outlined" className={props.className}/>
            </div>
          ))
        }
    </CardContent>
    <CardContent>
      <Typography variant="headline" gutterBottom>Các bước</Typography>
        <Grid container spacing={16}>
        {
          recipe.steps.map((step, index) => (
            <Grid key={index} container item spacing={8}>
              <Grid item>
                <Chip label={index + 1} className={props.className}/>
              </Grid>
              <Grid item xs={12} sm container alignItems="center" >
                <Grid item xs container direction="row" >
                  <Typography variant="body1" gutterBottom>{step.text}</Typography>
                </Grid>
                <Grid container spacing={8} >
                  {
                    step.images.map((image, i) => (
                      <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                        <Card square>
                          <CardActionArea>
                          <CardMedia image={image} style={{paddingTop: '75%', marginTop : 0}} />
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )) 
                  }
                </Grid>
              </Grid>
            </Grid>
          ))
        }
        </Grid>
    </CardContent>
  </>
  )
}

RecipeContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}

function SnapsContainer(props) {
  const {snaps} = props
  return (
    <Grid container >
      {
        snaps.map((image, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
            <Card square elevation={0}>
              <CardActionArea>
              <CardMedia image={image} style={{paddingTop: '100%', marginTop : 0}} />
              </CardActionArea>
            </Card>
          </Grid>
        )) 
      }
      {
        <Grid item key="add" xs={12} sm={6} md={4} lg={4}>
          <Card square elevation={0}>
            <Grid container justify='center' alignContent='center'>
            <Button variant="extendedFab" style={{marginTop:'30%', marginBottom:'40%'}}>Thêm ảnh của bạn</Button>
            </Grid>
          </Card> 
        </Grid>
      }
    </Grid>
  )
}

SnapsContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}

function CommentsContainer(props) {
  const {comments, user} = props
  return (
    <CardContent>
      <Grid container spacing={16}>
        <Grid item >
          <Avatar style={{top:-8, marginTop:'60%',height:24, width:24}} src={user.picture}/>  
        </Grid>
        <Grid item xs sm container alignItems="center" >
          <Grid item xs container direction="row" >
          <TextField
            id="outlined-dense"
            label="Viết bình luận..."
            margin="dense"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    aria-label="comments"
                  >
                    <SendIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          </Grid>
        </Grid>
      </Grid>
      
      {
        comments.map((comment, index) => (
          <Grid key= {index} container spacing={16}>
            <Grid item>
              <IconButton style={{height:24, width:24}}>
                <Avatar src={comment.chef.picture} style={{top:-12,height:24, width:24}}/>
              </IconButton>
            </Grid>
            <Grid item xs sm container alignItems="center" >
              <Grid item xs container direction="row" >
                <Typography variant="body1" gutterBottom>{comment.text}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))
      }
    </CardContent>
  )
}

CommentsContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}

class Dish extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes, dish, user } = this.props
    const { value } = this.state
    const { recipe, snaps, comments } = dish

    return (
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={8} justify='center'>
            <Card square className={classes.card}>
              <CardMedia
                className={classes.media}
                image={recipe.picture}
                title={recipe.name}
              />

              <CardContent>
                <Typography variant="h5" color='primary' >
                  {recipe.name}
                </Typography>

                <Typography variant='body2'>
                  {recipe.description}
                </Typography>
              </CardContent>
              
              <CardHeader
                avatar={
                  <Avatar src={recipe.chef.picture} className={classes.avatar}/>
                }
                action={
                  <>
                  <IconButton onClick={this.props.actions.fetchDish} >
                    <Badge badgeContent={1000} classes={{ badge: classes.badge }} style={{top:-4, right:0}}>
                    {
                      recipe.liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="inherit" />
                    }
                    </Badge>
                  </IconButton>
                  <IconButton >
                    <Badge badgeContent="Lưu" classes={{ badge: classes.badge }} style={{top:-4, right:0}}>
                    {
                      recipe.did_bookmark ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon color="inherit" />
                    }
                    </Badge>
                  </IconButton>
                  <IconButton style={{marginRight: 10}}>
                    <Badge badgeContent="..." classes={{ badge: classes.badge }} style={{top:-4, right:0}}>
                    {
                      recipe.chef.followed ? <NotificationsIcon color="primary"/> :  <NotificationsIcon color="inherit"/>
                    }
                    </Badge>
                  </IconButton>
                  </>
                }
                title={recipe.chef.name}
              />
              <Divider/>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Công thức" />
                <Tab label="Hình ảnh" />
                <Tab label="Bình luận" />
              </Tabs>
              <Divider/>
              
              {value === 0 && <RecipeContainer recipe={recipe} className={classes.chip}/>}
              {value === 1 && <SnapsContainer  snaps={snaps}/>}
              {value === 2 && <CommentsContainer user={user} comments={comments}/>}
              
            </Card>
          </Grid>


          
        </div>
      </main> 
    ) 
  }
}

Dish.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Dish) 
