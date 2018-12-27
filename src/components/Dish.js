import React, { Component } from 'react'
import classNames from 'classnames'
import { Paper, Badge, Chip, Grid, Avatar, Typography, Button, Divider, Tab, Tabs, Card, CardMedia, TextField, CardActionArea } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'
import CardHeader from '@material-ui/core/CardHeader' 
import CardContent from '@material-ui/core/CardContent' 
import IconButton from '@material-ui/core/IconButton' 
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import EditIcon from '@material-ui/icons/Edit'
import NotificationsIcon from '@material-ui/icons/Notifications'
import styles from '../assets/dishStyles'



function RecipeContainer(props) {
  const { recipe } = props
  
  return (
    <>
    <CardContent>
      <Typography variant="headline" gutterBottom>Nguyên liệu</Typography>
        {
          recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
            <Chip label={ingredient} variant="outlined" className={props.className} clickable/>
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
                <Chip label={index + 1} className={props.className} elevation={4}/>
              </Grid>
              <Grid item xs={12} sm container alignItems="center" >
                <Grid item xs container direction="row" >
                  <Paper style={{margin: 8}} elevation={4}>
                  <Typography style={{margin: 8}} variant="body1" gutterBottom>{step.text}</Typography>
                  </Paper>
                </Grid>
                <Grid container spacing={8} >
                  {
                    step.images.map((image, i) => (
                      <Grid item key={i} xs={6} sm={6} md={4} lg={4}>
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
  const {snaps, OnUploadImage} = props
  return (
    <>
    <Grid container >
      {
        snaps.map((snap, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
            <Card square elevation={0}>
              <CardActionArea>
              <CardMedia image={snap} style={{paddingTop: '100%', marginTop : 0}} />
              </CardActionArea>
            </Card>
          </Grid>
        )) 
      }
    </Grid>
    <Grid container justify='center' alignContent='center'>
      <input onChange={OnUploadImage} accept="image/*" style={{display:'none'}} id="icon-button-file" type="file" encType="multipart/form-data"/>
        <label htmlFor="icon-button-file">
          <Button component="span" variant="extendedFab" style={{marginTop:'30%', marginBottom:'40%'}}>Thêm ảnh của bạn</Button>
        </label>
    </Grid>

    </>
  )
}

SnapsContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}

function CommentsContainer(props) {
  const {comments, user, onKeyPress, onClick} = props
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
            multiline
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <Button
            //         aria-label="comments"
            //         onClick={() => onKeyPress({key:'Enter', target: {value: commentText}})}
            //       >
            //         <SendIcon />
            //       </Button>
            //     </InputAdornment>
            //   ),
            // }}
            onKeyDown={onKeyPress} 
          />
          </Grid>
        </Grid>
      </Grid>
      
      {
        comments.map((comment, index) => (
          <Grid key= {index} container spacing={16}>
            <Grid item>
              <IconButton style={{height:24, width:24}} onClick={() => onClick(comment.chef.id)}>
                <Avatar src={comment.chef.picture} style={{top:-12,height:24, width:24}}/>
              </IconButton>
            </Grid>
            <Grid item xs sm container alignItems="center" >
              <Grid item xs container direction="row" >
                <Paper elevation={1}>
                <Typography style={{margin:8}} variant="body1" gutterBottom>{comment.text}</Typography>
                </Paper>
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

  componentWillMount() {
    const id = this.props.match.params.id
    console.log(id)
    this.props.actions.fetchDishRecipe(id, this.props.user.userID)
    this.props.actions.fetchDishIngredients(id)
    this.props.actions.fetchDishSteps(id)
    this.props.actions.fetchDishSnaps(id)
    this.props.actions.fetchDishComments(id)
    this.props.actions.fetchDishChef(id, this.props.user.userID)
    
  }

  componentDidUpdate() {
    document.title = this.props.dish.recipe.name
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleLike = (id) => {
    this.props.actions.fetchLike(this.props.dish.recipe.id, this.props.user.userID, this.props.dish.recipe.liked)
  }

  handleBookmark = (id) => {
    this.props.actions.fetchBookmark(this.props.dish.recipe.id, this.props.user.userID, this.props.dish.recipe.did_bookmark)
  }

  handleFollow = (targetID) => {
    this.props.actions.follow(targetID)
  }

  handleCommentKeyPress = (event) => {
    const {key} = event
    if (key === 'Enter') {
      this.props.actions.fetchComment(this.props.dish.recipe.id, this.props.user, event.target.value)
      event.target.value = ''
      event.preventDefault()
    }
  }

  handleAvatarClick = (id) => {
    this.props.history.push('/chef/' + id)
  }

  handleOnUploadImage = (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image)
    formData.append('id', this.props.dish.recipe.id)
    formData.append('userID', this.props.user.userID)

    this.props.actions.fetchUploadImage(formData)
  }

  presentEdit = () => {
    this.props.history.push('/edit/' + this.props.dish.recipe.id)
  }

  render() {
    const { classes, dish, user } = this.props
    const { value } = this.state
    const { recipe, snaps, comments, isOwnedUser } = dish

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
                <Typography variant="headline" color='primary' >
                  {recipe.name}
                </Typography>

                <Typography variant="subheading">
                  {recipe.description}
                </Typography>
              </CardContent>
              
              <CardHeader
                avatar={
                  <IconButton onClick={() => this.handleAvatarClick(recipe.chef.id)}>
                    <Avatar src={recipe.chef.picture} className={classes.avatar}/>
                  </IconButton>
                }
                action={
                  <>
                  <IconButton style={{marginTop: 12}} onClick={() => this.handleLike(recipe.id)} >
                    <Badge badgeContent={recipe.hearts} classes={{ badge: classes.badge }} style={{top:-4, right:0}}>
                    {
                      recipe.liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="inherit" />
                    }
                    </Badge>
                  </IconButton>
                  <IconButton style={{marginTop: 12}} onClick={() => this.handleBookmark(recipe.id)}>
                    <Badge badgeContent="Lưu" classes={{ badge: classes.badge }} style={{top:-4, right:0}}>
                    {
                      recipe.did_bookmark ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon color="inherit" />
                    }
                    </Badge>
                  </IconButton>
                  <IconButton onClick={() => this.handleFollow(recipe.chef.id)} style={{marginRight: 10, marginTop:12}}>
                    <Badge badgeContent="..." classes={{ badge: classes.badge }} style={{top:-4, right:0}}>
                    {
                      recipe.chef.followed ? <NotificationsIcon color="primary"/> :  <NotificationsIcon color="inherit"/>
                    }
                    </Badge>
                  </IconButton>
                  </>
                }
                title={
                  <Typography variant="subtitle2">
                    {recipe.chef.name}
                  </Typography>
                }
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
              
              {value === 0 && <RecipeContainer recipe={recipe} className={classes.chip} />}
              {value === 1 && <SnapsContainer  snaps={snaps} OnUploadImage={this.handleOnUploadImage}/>}
              {value === 2 && <CommentsContainer onClick={this.handleAvatarClick} onKeyPress={this.handleCommentKeyPress} user={user} comments={comments}/>}
              
            </Card>
          </Grid>

          {isOwnedUser && <Button onClick={this.presentEdit} variant='fab' color='primary' className={classes.fab}>
            <EditIcon/>
          </Button>}
        </div>
      </main> 
    ) 
  }
}

Dish.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Dish) 
