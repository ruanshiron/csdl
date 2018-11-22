import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Avatar, Typography, Button, Divider, Tab, Tabs, Paper} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import { withStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.Proptypes = {
  children: Proptypes.node.isRequired,
}

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
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 240,
    height: 240,
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

class Chef extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
  

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
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography variant="h2" gutterBottom>
                    Lã Ngọc Bố
                  </Typography>
                  <Typography variant="display1" component="h2" gutterBottom>
                    Nhà hàng 3 con cừu con
                  </Typography>
                </Grid>
                <Grid item>
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                  <NotificationsIcon />
                </Button>
                <Button variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
                  <EditIcon />
                </Button>
                <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
                  Messenger
                </Button>
                <Button variant="fab" disabled aria-label="Delete" className={classes.button}>
                  <DeleteIcon />
                </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{margin:50}}/>
          <Paper className={classes.root}>
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
          </Paper>
        </div>
      </main>

    ) 
  }
}

Chef.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Chef) 
