import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
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

const cards = [
  {
    index: 1,
    name: 'Tỏi Nướng',
    description: '236 Calo, Tốt cho sức khỏe',
    image: '/resource/pictures/hqdefault.jpg'
  }, 
  {
    index: 2,
    name: 'Cà rốt xào chân rết',
    description: '1000 Calo, Ngon bổ rẻ',
    image: '/resource/pictures/2.jpg'
  },
  {
    index: 3,
    name: 'Thịt Nướng Bóng Đêm',
    description: '23121 Calo, Ăn vào có người yêu',
    image: '/resource/pictures/3.jpg'
  },
  {
    index: 4,
    name: 'Bánh Nướng Ban đêm',
    description: '414 Calo, Thức ăn cho vua chúa',
    image: '/resource/pictures/4.jpg'
  },
  {
    index: 5,
    name: 'Ăn cả bàn',
    description: '1212 Calo, Không thể ăn',
    image: '/resource/pictures/5.jpg'
  },
  {
    index: 6,
    name: 'Bánh Mật Hoa Dâm Bụt',
    description: '4151 Calo, Khó ăn dễ nấu',
    image: '/resource/pictures/6.jpg'
  },
  {
    index: 7,
    name: 'Chưa đặt tên',
    description: '2656 Calo, Dễ nấu - Dễ ăn - Dễ Tiêu - Dễ Thải',
    image: '/resource/pictures/7.jpg'
  },
  {
    index: 8,
    name: 'Mì Italy',
    description: '123 Calo, Cùng Shopee pipipi',
    image: '/resource/pictures/8.jpg'
  },
  {
    index: 9,
    name: 'Bánh mì Chảo - Không bánh',
    description: '111 Calo, Sale 91%',
    image: '/resource/pictures/9.jpg'
  }
]

class Explore extends Component {
  

  render() {
    const { classes } = this.props;

    return (

      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
            {cards.map(card => (
              <Grid item key={card.index} sm={6} md={4} lg={4}>
                <Card className={classes.card}>
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
                  <CardActions>
                    <Button size="small" color="primary">
                      Like
                    </Button>
                    <Button size="small" color="primary">
                      Let's Cook
                    </Button>
                    <Button size="small" color="primary">
                      Order
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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
