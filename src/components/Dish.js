import React, { Component } from 'react'
import classNames from 'classnames'
import { InputAdornment, Chip, Grid, Avatar, Typography, Button, Divider, Tab, Tabs, Paper, GridList, GridListTile, Card, CardMedia, ButtonBase, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import { withStyles } from '@material-ui/core/styles'
import Proptypes, { func } from 'prop-types'
import CardHeader from '@material-ui/core/CardHeader' 
import CardContent from '@material-ui/core/CardContent' 
import CardActions from '@material-ui/core/CardActions' 
import Collapse from '@material-ui/core/Collapse' 
import IconButton from '@material-ui/core/IconButton' 
import red from '@material-ui/core/colors/red' 
import FavoriteIcon from '@material-ui/icons/Favorite' 
import BookmarkIcon from '@material-ui/icons/Bookmark' 
import SendIcon from '@material-ui/icons/Send'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore' 
import MoreVertIcon from '@material-ui/icons/MoreVert' 
import NotificationsIcon from '@material-ui/icons/Notifications'

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import classnames from 'classnames' 
import Ingredient from './Ingredient';
import recipes from '../reducers/recipes';

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
  media: {
    paddingTop: '56.25%', // 16:9
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

const reipe = {
  ingredients: [
    "Gạo",
    "Muối",
    "Rau",
    "Gạo",
    "Muối",
    "Rau",
  ],
  steps: [
    {
      index: 1,
      text: 'đun sôi nước nóng sadadasd a d as dsd ad asd a dad asdw as sad aw as dasd ws daw as dwf  aw a fasf ewfsda  aw ew af s',
      images: [
        '/',
        '/'
      ]
    },
    {
      index: 2,
      text: 'Bật lò ở 150 độ trong. Cho đường vào nồi để lửa nhỏ, quấy đều cho tan đều sau khi đường chuyển màu cánh gián nhạt thì bắc ra múc dần vào hũ. Vì nồi kim loại nên trong thời gian múc đường ngả dần sang nâu cánh gián tuyệt đẹp. Sau đó cho các hũ vào tủ lạnh cho caramen đông hẳn.',
      images: [
        '/',
        '/'
      ]
    },
    {
      index: 3,
      text: 'đun sôi nước nóng',
      images: [
        '/',
        '/'
      ]
    }
  ]
}

const tileData = [
 {
    image: '/resource/pictures/8.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    image: '/resource/pictures/9.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    image: '/resource/pictures/6.jpg',
    title: 'Image',
    author: 'author',
  },
];

const commnents = [
  {
    text: 'Bật lò ở 150 độ trong. Cho đường vào nồi để lửa nhỏ, quấy đều cho tan đều sau khi đường chuyển màu cánh gián nhạt thì bắc ra múc dần vào hũ. Vì nồi kim loại nên trong thời gian múc đường ngả dần sang nâu cánh gián tuyệt đẹp. Sau đó cho các hũ vào tủ lạnh cho caramen đông hẳn.',
    liked: true,

  },
  {
    text: 'Bật lò ở 150 độ trong..',
    liked: true,

  },
  {
    text: 'Bật lò ở 150 độ trong. Cho đường vào nồi để lửa nhỏ, quấy đều cho tan đều sau khi đường chuyển màu cánh gián nhạt thì bắc ra múc dần vào hũ. Vì nồi kim loại nên trong thời gian múc đường ngả dần sang nâu cánh gián tuyệt đẹp. Sau đó cho các hũ vào tủ lạnh cho caramen đông hẳn.',
    liked: true,

  },
  {
    text: 'Bật lò ở 150 độ trong. Cho đường vào nồi để lửa nhỏ, quấy đều cho tan đều sau khi đường chuyển màu cánh gián nhạt thì bắc ra múc dần vào hũ. Vì nồi kim loại nên trong thời gian múc đường ngả dần sang nâu cánh gián tuyệt đẹp. Sau đó cho các hũ vào tủ lạnh cho caramen đông hẳn.',
    liked: true,

  },
  {
    text: 'Bật lò ở 150 độ trong. Cho đường vào nồi để lửa nhỏ, quấy đều cho tan đều sau khi đường chuyển màu cánh gián nhạt thì bắc ra múc dần vào hũ. Vì nồi kim loại nên trong thời gian múc đường ngả dần sang nâu cánh gián tuyệt đẹp. Sau đó cho các hũ vào tủ lạnh cho caramen đông hẳn.',
    liked: true,

  },
  {
    text: 'Bật lò ở 150 độ trong. Cho đường vào nồi để lửa nhỏ, quấy đều cho tan đều sau khi đường chuyển màu cánh gián nhạt thì bắc ra múc dần vào hũ. Vì nồi kim loại nên trong thời gian múc đường ngả dần sang nâu cánh gián tuyệt đẹp. Sau đó cho các hũ vào tủ lạnh cho caramen đông hẳn.',
    liked: true,

  },
  {
    text: 'Bật lò ở 150 độ trong. Cho đường vào nồi để lửa nhỏ, quấy đều cho tan đều sau khi đường chuyển màu cánh gián nhạt thì bắc ra múc dần vào hũ. Vì nồi kim loại nên trong thời gian múc đường ngả dần sang nâu cánh gián tuyệt đẹp. Sau đó cho các hũ vào tủ lạnh cho caramen đông hẳn.',
    liked: true,

  },
]

function RecipeContainer(props) {
  return (
    <>
    <CardContent>
      <Typography variant="headline" gutterBottom>Nguyên liệu</Typography>
        {
          props.ingredients.map((ingredient, index) => (
            <div key={index}>
            <Chip label={ingredient} variant="outlined" className={props.className}/>
            </div>
          ))
        }
    </CardContent>
    <CardContent>
      <Typography variant="headline" gutterBottom>Các bước</Typography>
        {
          props.steps.map(step => (
            <Grid key={step.index} container spacing={8}>
              <Grid item>
                <Chip label={step.index} className={props.className}/>
              </Grid>
              <Grid item xs={12} sm container alignItems="center" >
                <Grid item xs container direction="row" >
                  <Typography variant="body1" gutterBottom>{step.text}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
    </CardContent>
  </>
  )
}

RecipeContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}

function SnapsContainer(props) {
  return (
    <div style={
      {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      }
    }>
      <GridList cellHeight={160} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.image} cols={1}>
            <img src={tile.image} alt={tile.title} />
          </GridListTile>
        ))}
        <GridListTile>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
            <IconButton >
              <PhotoCameraIcon fontSize="large" />
            </IconButton>
            </Grid>
        </GridListTile>
      </GridList>
    </div>
  )
}

SnapsContainer.Proptypes = {
  ingredients: Proptypes.array.isRequired,
}

function CommentsContainer(props) {
  return (
    <CardContent>
      <Grid container spacing={16}>
        <Grid item >
          <Avatar style={{height:24, width:24}} src={props.user.picture}/>
        </Grid>
        <Grid item xs={12} sm container alignItems="center" >
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
        commnents.map((comment, index) => (
          <Grid key= {index} container spacing={16}>
            <Grid item>
              <Avatar style={{height:24, width:24}}>4</Avatar>
            </Grid>
            <Grid item xs={12} sm container alignItems="center" >
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
  };

  handleChange = (event, value) => {
    this.setState({ value })
  };

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={8} justify='center'>
            <Card square className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/resource/pictures/8.jpg"
                title="Paella dish"
              />

              <CardContent>
                <Typography variant="h5" color='primary' >
                  Rau muống luộc
                </Typography>

                <Typography variant='body2'>
                  cho gđ vs bạn bè vào dịp cuối tuần
                </Typography>
              </CardContent>
              
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <>
                  <IconButton >
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                  <IconButton color="primary">
                    <BookmarkIcon />
                  </IconButton>
                  <IconButton style={{marginRight: 10}}>
                    <NotificationsIcon />
                  </IconButton>
                  </>
                }
                title="Nguyễn Thế Vinh"
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
              
              {value === 0 && <RecipeContainer ingredients={reipe.ingredients} steps={reipe.steps} className={classes.chip}></RecipeContainer>}
              {value === 1 && <SnapsContainer  />}
              {value === 2 && <CommentsContainer user={this.props.user}/>}
              {
                console.log(this.props.user.picture)
              }
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
