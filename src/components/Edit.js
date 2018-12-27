import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { InputAdornment, Grid, Typography, Button, Divider, Card, CardMedia, TextField, CardActionArea } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent' 
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton' 
import CancelIcon from '@material-ui/icons/Cancel'
import styles from '../assets/editStyles'

class Edit extends Component {
  state = {
    isSubmitted : false,
  }


  componentDidMount() {
    const id = this.props.match.params.id
    console.log(id)
    this.props.actions.fetchEditRecipe(id)
    this.props.actions.fetchEditIngredients(id)
    this.props.actions.fetchEditSteps(id)
  }

  componentDidUpdate() {
    document.title = this.props.edit.name == null ? 'Món mới' : 'Sửa' + this.props.edit.name
    document.getElementById('name').value = this.props.edit.name
    document.getElementById('description').value = this.props.edit.description
    this.props.edit.ingredients.map((ingredient, index) => {
      document.getElementById('ingredients'+index.toString()).value = ingredient
    })
    this.props.edit.steps.map((step, index) => {
      document.getElementById('steps'+index.toString()).value = step.text
    })
  }


  handleToggleStepPhoto = (step, snap) => {
    
  }

  isCorrect(data) {
    var r = true
    if (data.name.trim() === "") return false
    if (data.description.trim() === "") return false
    // if (data.image === "") return false
    data.ingredients.map((text) => {
      if (text.trim() === "") r = false
      return false
    })
    data.steps.map((step) => {
      if (step.text.trim() === "") r = false
      return false
    })
    return r
  }

  handleOnSubmit = (edit) => {
    if (!this.isCorrect(edit)) {
      console.log(false)
    } else {
      this.props.actions.fetchSubmit(edit)
      this.setState({
        isSubmitted: true
      })
      this.props.history.push('/dish/' + edit.id)
    }
  } 

  

  handleOnKeyPress = (type, event, data) => {
    if (event.key !== 'Enter') 
      return

    switch (type) {
      case 'ingredients':
        data[type].push('')
        break
      case 'steps':
        data[type].push({
          text: "",
          images: [
            "",
            "",
            ""
          ]
        })
        break
      default:
        break
    }
    event.preventDefault()

    this.forceUpdate(() => {
      
    })
  }

  handleOnChange = (type, event, data, index) => {
    switch (type) {
      case 'name':
        data[type] = event.target.value
        break
      case 'description':
        data[type] = event.target.value
        break
      case 'ingredients':
        data[type][index] = event.target.value
        break
      case 'steps':
        data[type][index].text = event.target.value
        break
      default:
        break
    }

    console.log(this.props.edit)
  }


  handleOnDelete = (type, data, index) => {
    switch (type) {
      case 'name':
        return
      case 'description':
        return
      case 'ingredients':
        if (data[type].length === 1) {
          data[type] = [""]
        } else {
          data[type].splice(index,1)
        }
        this.forceUpdate()
        data[type].map((d, i) => (
          document.getElementById(type + i.toString()).value = d
        ))
        break
      case 'steps':
        if (data[type].length === 1) {
          data[type][index].text = ""
        } else {
          data[type].splice(index,1)
        }
        this.forceUpdate()
        data[type].map((d, i) => (
          document.getElementById(type + i.toString()).value = d.text
        ))
        break
      default:
        break
    }

  }

  OnUploadPicture = (e, type) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image)

    this.props.actions.fetchUploadBuffer(formData, type)
  }

  presentDish = () => {
    
  }


 
  render() {
    const { classes} = this.props
    const { isSubmitted } = this.props.edit
    var { edit } = this.props

    

    return (
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={8} justify='center'>
            <Card square className={classes.card}>
              <input onChange={(e) => this.OnUploadPicture(e, 'picture')} accept="image/*" style={{display:'none'}} id="edit-picture" type="file" encType="multipart/form-data"/>
              <label htmlFor="edit-picture">
              <CardActionArea component="span">
                {
                  edit.picture != null && 
                  <CardMedia
                  className={classes.media}
                  image={edit.picture}
                  title="dsasda"
                  />
                }
                <CardContent>
                  <Grid container alignItems='center' direction='column'>
                
                    <PhotoCameraIcon style={{marginTop: 16}} />
    
                    <Typography style={{margin: 16}}>
                      Đăng hình thành phẩm nhé!
                    </Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
              </label>

              <CardContent>
                <TextField
                  name="title"
                  id="name"
                  label="Viết tên món..."
                  className={classNames(classes.textField, classes.dense)}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => this.handleOnChange('name', e, edit, null)} 
                />
                <TextField
                  id="description"
                  label="Thêm mô tả..."
                  className={classNames(classes.textField, classes.dense)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => this.handleOnChange('description', e, edit, null)} 
                />
              </CardContent>
              <CardContent>
                <Typography variant="h6">
                  Nguyên Liệu
                </Typography>
                {
                  edit.ingredients.map( (text, index) => (
                    <TextField
                      id={"ingredients" + index.toString()}
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
                              onClick={(e) => this.handleOnDelete('ingredients', edit, index)}
                            >
                              <CancelIcon/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onKeyPress={(e) => this.handleOnKeyPress('ingredients', e, edit)}
                      onChange={(e) => this.handleOnChange('ingredients', e, edit, index)}
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
                  edit.steps.map((step,index) => (
                    <Fragment key={index}>
                    <TextField
                      id={'steps' + index.toString()}
                      label={ "Bước " + (index+1).toString()}
                      helperText="Nhấn Enter để thêm bước mới, nhấn lại để thêm/thay hình"
                      className={classNames(classes.textField, classes.dense)}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Nội dung..."
                      fullWidth
                      multiline
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => this.handleOnDelete('steps', edit, index)}
                            >
                              <CancelIcon/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onKeyPress={(e) => this.handleOnKeyPress('steps', e, edit)}
                      onChange={(e) => this.handleOnChange('steps', e, edit, index)}
                      autoFocus={index===0? false: true}
                    />
                    <Grid container spacing={8}>
                    {
                      step.images.map((snap, i) => (
                        <Grid key={i} item xs={12} sm={4} md={4} lg={4}>
                          <Card style={{marginBottom: 10, height: 181}} square elevation={0}>
                          <input onChange={(e) => this.OnUploadPicture(e, 'step-'+index+'-'+i)} accept="image/*" style={{display:'none'}} id={'step-'+index+'-'+i} type="file" encType="multipart/form-data"/>
                            <label htmlFor={'step-'+index+'-'+i}>
                            <CardActionArea component="span">
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
                            </label>
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

              <Button onClick={() => this.handleOnSubmit(edit)} variant='fab' color='primary' className={classes.fab}>
                <SendIcon/>
              </Button>

            </Card>
          </Grid> 
          
        </div>
      </main> 
    ) 
  }
}

Edit.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Edit) 
