import React, { Component, Fragment } from 'react'
import { Grow, Popper, ClickAwayListener, Paper, AppBar, Toolbar, withStyles, Typography, IconButton, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search' 
import { fade } from '@material-ui/core/styles/colorManipulator' 
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
import axios from 'axios'


const styles = theme => ({
  title: {
    display: 'block',
    marginLeft: theme.spacing.unit * 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 6,
      marginRight: theme.spacing.unit * 9,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },

  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  list: {
    maxHeight: 'auto',
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 0,
  },

  paper: {
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 300, 
    }
  },


  grow: {
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '32%',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 0,
      width: 'auto',
    },
    [theme.breakpoints.down(321)]: {
      display: 'none'
    }
  },
  searchButton: {
    [theme.breakpoints.up(321)]: {
      display: 'none',
      marginLeft: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  inputRoot: {
    color: 'inherit',
    width: '90%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
    }
  },
  section: {
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing.unit * 6,
    },
  },
})




class Header extends Component {
  state = {
    anchorEl: null,
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/test', {hihi: 'test'})
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  MyFacebookButton = ({ onClick }) => (
    <IconButton color="inherit" onClick={ onClick } >
      <FaFacebook/>
    </IconButton>
  );
   
  handleNotificationClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleNotificationClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  authenticate = response => {
    this.props.actions.facebookLogin({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

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

            <IconButton color="inherit">
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

export default withStyles(styles)(Header)