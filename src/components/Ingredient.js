import React, { Component } from 'react'
import classNames from 'classnames'
import { Grid, Avatar, Typography, Button, Divider, Tab, Tabs, Paper, GridList, GridListTile} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
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

const tileData = [
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

class Ingredient extends Component {
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
                alt="Chân gà"
                src="/resource/pictures/3_650384.jpg"
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
            </Grid>  
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography variant="h2" gutterBottom>
                    Chân gà
                  </Typography>
                  <Typography variant="h2" component="h2" gutterBottom>
                    Nguyên liệu
                  </Typography>
                  <Typography variant="h1" component="h2" gutterBottom>
                    Có trong các món ven đường, ít Calories, ít béo
                  </Typography>
                </Grid>
                <Grid item>
                <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
                  <AddIcon className={classes.extendedIcon} />
                  Favourite
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
              <Tab label="Món nấu cùng" />
              <Tab label="Cách chọn" />
            </Tabs>
            {value === 1 && <TabContainer>Công thức</TabContainer>}
            {value === 0 && 
              <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                  {tileData.map(tile => (
                    <GridListTile key={tile.image} cols={tile.cols || 1}>
                      <img src={tile.image} alt={tile.name} />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            }
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

Ingredient.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Ingredient) 
