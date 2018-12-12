import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, CardActionArea, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import {withRouter} from 'react-router-dom'

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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  
});

class Explore extends Component {


  componentDidMount() {
    console.log(this.props)
  }

  handleRecipeClicked(id) {
    this.props.history.push("/dish/" + id.toString())
  }

  handleMoreRecipe() {
    this.props.actions.exploreMoreRecipe(null)
  }

  render() {
    const { classes, recipes, actions } = this.props;

    return (

      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40}>
            {recipes.map(card => (
              <Grid item key={card.id} xs={12} sm={6} md={4} lg={4}>
                <Card className={classes.card}>
                  <CardActionArea className={classes.cardActionArea} onClick={()=>this.handleRecipeClicked(card.id)}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.image}
                      title={card.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Divider/>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => actions.likeRecipe(card.id)}>
                      Thích
                    </Button>
                    <Button size="medium" color="primary">
                      Lưu
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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

export default withRouter(withStyles(styles)(Explore))
