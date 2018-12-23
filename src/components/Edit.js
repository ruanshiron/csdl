import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { Badge, InputAdornment, Chip, Grid, Avatar, Typography, Button, Divider, Tab, Tabs, Card, CardMedia, TextField, CardActionArea } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import CardHeader from '@material-ui/core/CardHeader' 
import CardContent from '@material-ui/core/CardContent' 
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton' 
import CancelIcon from '@material-ui/icons/Cancel'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
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
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
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
    margin: 0,
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
  textField: {
    marginLeft: 0,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  resize:{
    fontSize: 24
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')] : {
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 4,
    },
    [theme.breakpoints.up('md')] : {
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 18,
    }
  },
});


class Edit extends Component {
  state = {
    ingredients: [
      "",
    ],
    steps: [
      {
        text: "",
        snaps: [
          "http://hinhnendepnhat.net/wp-content/uploads/2017/11/Hinh-anh-dep-girl-xinh-de-thuong-nhat-nam-mau-tuat-2018.jpg",
          "http://sohanews.sohacdn.com/thumb_w/660/2017/photo1486969199024-1486969199175-0-32-308-529-crop-1486969281069.jpg",
          ""
        ],
      }
    ]
  }

  componentWillMount() {
    console.log(this.props.match)
  }

  handleIngredientKeyPress = (event, index) => {
    const {key} = event
    if (key === 'Enter') {
      this.state.ingredients.push("")
      this.setState({
        ingredients: [
          ...this.state.ingredients,
        ]
      })
      event.preventDefault()
    }
    else this.state.ingredients[index] = event.target.value + key
    
  }

  handleDeleteIngredient = (event, index) => {
    var a = [...this.state.ingredients]
    a.splice(index, 1)
    if (a.length === 0) {
      this.setState({
        ingredients: [""]
      })
    } else 
      this.setState({
        ingredients: a,
      })
    
  }

  handleStepKeyPress = (event, index) => {
    const {key} = event
    if (key === 'Enter') {
      this.state.steps.push(
        {
          text: "",
          snaps: [
            "",
            "",
            ""
          ],
        }
      )
      this.setState({
        steps: [
          ...this.state.steps,
        ]
      })
      event.preventDefault()
    }
    else this.state.steps[index].text = event.target.value + key

  }

  handleDeleteStep = (event, index) => {
    var a = [...this.state.steps]
    a.splice(index, 1)
    console.log(a)
    if (a.length === 0) {
      this.setState({
        steps: [
          {
          text: "",
            snaps: [
              "",
              "",
              ""
            ],
          }
        ]
      })
    } else 
      this.setState({
        steps: a,
      })

      console.log(this.state.steps)
  }


  render() {
    const { classes} = this.props
    var { ingredients, steps } = this.state

    return (
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={8} justify='center'>
            <Card square className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="http://sohanews.sohacdn.com/zoom/640_360/2017/photo1506260210253-1506260211967-0-27-314-533-crop-1506260291957.jpg"
                  title="dsasda"
                  style={{display: 'none'}}
                />
                <CardContent>
                  <Grid container alignItems='center' direction='column'>
                
                    <PhotoCameraIcon style={{marginTop: 16}} />
    
                    <Typography style={{margin: 16}}>
                      Đăng hình thành phẩm nhé!
                    </Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>

              <CardContent>
                <TextField
                  id="name"
                  label="Viết tên món..."
                  className={classNames(classes.textField, classes.dense)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.resize
                    }
                  }}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="description"
                  label="Thêm mô tả..."
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </CardContent>
              <CardContent>
                <Typography variant="h6">
                  Nguyên Liệu
                </Typography>
                {
                  ingredients.map( (text, index) => (
                    <TextField
                      id="description"
                      key={index}
                      placeholder="10 tạ Thịt Lợn"
                      helperText="Nhấn Enter để thêm nguyên liệu"
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => this.handleDeleteIngredient(e, index)}
                            >
                              <CancelIcon/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onKeyPress={(e) => this.handleIngredientKeyPress(e, index)}
                      autoFocus={index===0? false: true}
                    />
                  ))
                }
              </CardContent>

              <CardContent>
                <Typography variant="h6">
                  Các bước
                </Typography>
                {
                  steps.map((step,index) => (
                    <Fragment key={index}>
                    <TextField
                      id="description"
                      label="Bước 1"
                      helperText="Nhấn Enter để thêm bước mới, nhấn lại để thêm/thay hình"
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      multiline
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => this.handleDeleteStep(e, index)}
                            >
                              <CancelIcon/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onKeyPress={(e) => this.handleStepKeyPress(e, index)}
                      autoFocus={index===0? false: true}
                    />
                    <Grid container spacing={8}>
                    {
                      step.snaps.map((snap, index) => (
                        <Grid key={index} item xs={12} sm={4} md={4} lg={4}>
                          <Card style={{marginBottom: 10, height: 181}} square elevation={0}>
                            <CardActionArea>
                              {
                              snap!=="" ? 
                                <CardMedia image={snap} style={{paddingTop: '100%', marginTop : 0}} /> 
                              :
                                <CardContent>
                                  <Grid container alignItems='center' direction='column'>
                                    <PhotoCameraIcon style={{margin: 62.5}} />
                                  </Grid>
                                </CardContent>
                              }
                            </CardActionArea>
                          </Card>
                        </Grid>  
                      ))
                    }
                    </Grid>
                    <Divider/>
                    </ Fragment>
                  ))
                }
                
              </CardContent>
              
            </Card>
          </Grid> 
          <Button variant='fab' color='primary' className={classes.fab}>
            <SendIcon/>
          </Button>
        </div>
      </main> 
    ) 
  }
}

Edit.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Edit) 
