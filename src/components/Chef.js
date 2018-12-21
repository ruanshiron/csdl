import React, { Component } from 'react'
import classNames from 'classnames'
import { IconButton, Grid, Avatar, Typography, Button, Divider, Badge} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

// TabContainer.Proptypes = {
//   children: Proptypes.node.isRequired,
// }

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
    width: 'auto',
    marginTop: 50,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(960 + theme.spacing.unit * 3 * 2)]: {
      width: 660,
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
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 140,
    height: 140,
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
    left: 10,
    top: 24
  },
});

class Chef extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    document.title = "Chef"
  }

  render() {
    const { classes } = this.props;
    //const { value } = this.state;
  

    return (


      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={16} justify='center'>
            <Grid item>
              <Avatar
                className={classNames(classes.avatar, classes.bigAvatar)}
              >
                CHEF  
              </Avatar>
            </Grid>  

            <Grid item xs={12} sm container>
              <Grid 
                justify='center' 
                item xs container 
                direction="column" 
                spacing={16}
              >
                <Grid 
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-end"
                >
                  <Grid item>
                  <Typography 
                    style={{marginLeft: 24}}
                    variant="h1" 
                    gutterBottom
                  >
                    Lã Ngọc Bố
                  </Typography>
                  </Grid>
                </Grid>

                <Grid item>

                  <IconButton aria-label="Cart">
                    <Badge badgeContent={4} color="primary" classes={{ badge: classes.badge }}>
                    <EditIcon fontSize="large" />
                    </Badge>
                  </IconButton>

                  <IconButton aria-label="Cart">
                    <Badge badgeContent={4} color="primary" classes={{ badge: classes.badge }}>
                    <PhotoCameraIcon fontSize="large" />
                    </Badge>
                  </IconButton>
                  <Button variant="fab" color="default" aria-label="Edit" className={classes.button}>
                    <NotificationsIcon/>
                  </Button>
                  <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
                    Theo dõi
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{margin:20}}/>
          {/* <Paper className={classes.root}>
            <Tabs
              value={this.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Công thức Đã Tạo" />
              <Tab label="Ảnh" />
              <Tab label="Món đã nấu" />
            </Tabs>
            {value === 0 && <TabContainer>Công thức</TabContainer>}
            {value === 1 && <TabContainer>Ảnh</TabContainer>}
            {value === 2 && <TabContainer>Đầu bếp</TabContainer>}
            {value === 3 && <TabContainer>Item Four</TabContainer>}
            {value === 4 && <TabContainer>Item Five</TabContainer>}
            {value === 5 && <TabContainer>Item Six</TabContainer>}
            {value === 6 && <TabContainer>Item Seven</TabContainer>}
          </Paper> */}
        </div>
      </main>

    ) 
  }
}

Chef.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Chef) 
