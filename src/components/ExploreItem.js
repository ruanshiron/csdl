import React, { Component } from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, CardActionArea, Divider, IconButton, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardActionArea: {
    flexGrow: 1,
    height: '100%'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    marginTop : 0,
  },
  cardContent: {
    flexGrow: 1,
    height: '100%'
  },
  badge: {
    top: 20,
    right: 1,
  },
})

class ExploreItem extends Component {

  handleRecipeClicked(id) {
    this.props.history.push("/dish/" + id.toString())
  }

  render() {
    const { dish, classes, actions } = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.cardActionArea} onClick={()=>this.handleRecipeClicked(dish.id)}>
          <CardMedia
            className={classes.cardMedia}
            image={dish.image}
            title={dish.name}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {dish.name}
            </Typography>
            <Typography>
              {dish.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider/>
        <CardActions>
          <IconButton size="small" onClick={() => actions.like(dish.id)}>
            <Badge badgeContent={1000} classes={{ badge: classes.badge }} style={{top:-4, right: 0}}>
            {
              dish.liked ? <FavoriteIcon color="secondary"/> : <FavoriteBorderIcon/>
            }
            </Badge>
          </IconButton>
          <IconButton size="small" onClick={() => actions.bookmark(dish.id)}>
            <Badge badgeContent="Lưu" classes={{ badge: classes.badge }} style={{top:-4, right: 0}}>
            {
              dish.bookmark ? <BookmarkIcon color="primary"/> : <BookmarkBorderIcon/>
            }
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

ExploreItem.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ExploreItem))