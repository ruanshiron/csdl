import React, { Component, Fragment } from 'react'
import { Grow, Popper, ClickAwayListener, Paper, AppBar, Toolbar, withStyles, Typography, IconButton, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search' 
import Badge from '@material-ui/core/Badge' 
import NotificationsIcon from '@material-ui/icons/Notifications' 
import EditIcon from '@material-ui/icons/Edit'
import ExploreIcon from '@material-ui/icons/Explore'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom'
import FacebookAuth from 'react-facebook-auth'
import { FaFacebook } from 'react-icons/fa'
import { AppID } from '../constants/Common'
import { Scrollbars } from 'react-custom-scrollbars'
import { withRouter } from 'react-router-dom'
import styles from '../assets/headerStyles'





class Header extends Component {
  state = {
    anchorEl: null,
  }

  MyFacebookButton = ({ onClick }) => (
    <IconButton color="inherit" onClick={ onClick } >
      <FaFacebook/>
    </IconButton>
  )
   
  handleNotificationClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleNotificationClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  authenticate = response => {
    this.props.actions.facebookLogin({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })
  }

  notificationsPopperRender = (messages, open, anchorEl, classes) => {
    return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <ClickAwayListener onClickAway={this.handleNotificationClose}>
            <Paper square className={classes.paper} >
            <Scrollbars style={{ width: 300, height: '60vh' }}>
              <List className={classes.list}>
                {messages.map(({ id, primary, secondary, person }) => (
                  <Fragment key={id}>
                    {id === 1 && <ListSubheader disableSticky={true} className={classes.subHeader}>Hôm nay</ListSubheader>}
                    {id === 3 && <ListSubheader disableSticky={true} className={classes.subHeader}>Hôm qua</ListSubheader>}
                    <ListItem button>
                      <Avatar alt="Profile Picture" src={person} />
                      <ListItemText primary={primary} secondary={secondary} />
                    </ListItem>
                  </Fragment>
                ))}
              </List>
            </Scrollbars>
            </Paper>
          </ClickAwayListener>
        </Grow>
      )}
    </Popper>
    )
  }

  linkToChef = () => {
    this.props.history.push("/chef/"+this.props.user.userID.toString())
  }

  componentClicked = () => console.log("clicked");

  render() {
    const { classes, messages } = this.props
    const { anchorEl } = this.state
    const { isLoggedIn } = this.props.user
    const open = Boolean(anchorEl)

    return (
      <Fragment>
      <AppBar>
        <Toolbar>
          {/* Phần chữ logo */}
          <Typography className={classes.title} variant="h6" color="inherit" component={Link} to='/' noWrap>
            logo
          </Typography>
          
          {/* Thanh tìm kiếm */}
          <div className={classes.grow}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Tìm kiếm"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.grow}/>
          
          {/* Menu  */}
          <div className={classes.section}>
            <IconButton className={classes.searchButton} color="inherit" component={Link} to= '/search'>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to= '/explore'>
              <ExploreIcon />
            </IconButton>

            <IconButton color="inherit" component={Link} to= '/edit/21'>
              <EditIcon />
            </IconButton>

            {this.notificationsPopperRender(messages, open, anchorEl, classes)}
            
            <IconButton 
              color="inherit" 
              onClick={this.handleNotificationClick}
              buttonRef={ node => {
                this.anchorEl = node
              }}
              disabled={open? true:false}
            >
              <Badge 
                invisible={true}
                badgeContent={1}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {isLoggedIn 
            ?<IconButton color="inherit" onClick={this.linkToChef}>
                <Avatar style={{width: 24, height: 24}} src={this.props.user.picture}></Avatar>
              </IconButton>
            
            :<FacebookAuth
                appId={AppID}
                autoLoad={true}
                callback={this.authenticate}
                component={this.MyFacebookButton}
              />
            }
            
          </div>
        </Toolbar>
      </AppBar>
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Header))