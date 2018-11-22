import React, { Component } from 'react'
import classNames from 'classnames'
import RecipeReviewCard from './RecipeReviewCard'
import { Grid } from '@material-ui/core';
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

class Home extends Component {

  render() {
    const { classes } = this.props;

    return (
      // <div>
      //   <Header/>

      //   <Grid container justify='center'>
      //     <Paper className={classes.section} justify='center'>
      //       <Grid container spacing={8}>
      //         <Grid item sm={8} xs={8}>
      //           <RecipeReviewCard dish={'Rau muống luộc'} chef={'Nguyễn Thế Vinh'} pics={'/resource/pictures/3_650384.jpg'}/>
      //           <RecipeReviewCard dish={'Thịt rang ruột ngựa'} chef={'Phùng Thế Hùng'} pics={'/resource/pictures/Cach-lam-mon-long-heo-xao-nghe-2-1533718709-579-width500height282.jpg'}/>
      //           <RecipeReviewCard dish={'Xò xào xúc xích'} chef={'Lã Ngọc Dương'} pics={'/resource/pictures/123.jpg'}/>
      //           <RecipeReviewCard dish={'Lòng lợn, tái nầm'} chef={'Ninh Mạnh Hùng'} pics={'/resource/pictures/hqdefault.jpg'}/>
      //           <RecipeReviewCard dish={'Rau muống luộc'} chef={'Nguyễn Thế Vinh'} pics={'/resource/pictures/Cach-lam-mon-long-heo-xao-nghe-2-1533718709-579-width500height282.jpg'}/>
      //         </Grid>
      //         <Grid item sm={4} xs={4}>
      //           <Paper className={classes.root}>
      //             <Grid container spacing={0}>
      //               <Grid>
      //                 <Card style={{boxShadow:'none'}}>
      //                   <CardHeader
      //                   avatar={
      //                     <Avatar aria-label="Recipe">
      //                       V
      //                     </Avatar>
      //                   }
      //                   title='Nguyễn Thế Vinh'
      //                   subheader='3 star'>
      //                   </CardHeader>
      //                 </Card>
      //               </Grid>
      //               <Grid>
      //                 <Card style={{boxShadow:'none'}}>
      //                     <CardHeader
      //                     subheader='Today'>
      //                     </CardHeader>
      //                   </Card>
      //               </Grid>
      //             </Grid>
      //           </Paper>
      //         </Grid>
      //       </Grid>
      //     </Paper>
      //   </Grid>

      // </div>

      
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40} justify='center'>
            <Grid item>
              <RecipeReviewCard dish={'Rau muống luộc'} chef={'Nguyễn Thế Vinh'} pics={'/resource/pictures/3_650384.jpg'}/>
              <RecipeReviewCard dish={'Thịt rang ruột ngựa'} chef={'Phùng Thế Hùng'} pics={'/resource/pictures/Cach-lam-mon-long-heo-xao-nghe-2-1533718709-579-width500height282.jpg'}/>
              <RecipeReviewCard dish={'Xò xào xúc xích'} chef={'Lã Ngọc Dương'} pics={'/resource/pictures/123.jpg'}/>
              <RecipeReviewCard dish={'Lòng lợn, tái nầm'} chef={'Ninh Mạnh Hùng'} pics={'/resource/pictures/hqdefault.jpg'}/>
              <RecipeReviewCard dish={'Rau muống luộc'} chef={'Nguyễn Thế Vinh'} pics={'/resource/pictures/Cach-lam-mon-long-heo-xao-nghe-2-1533718709-579-width500height282.jpg'}/>
            </Grid>  
          </Grid>
        </div>
      </main>

    ) 
  }
}

Home.Proptypes = {
  classes: Proptypes.object.isRequired,
}

export default withStyles(styles)(Home) 
