
import { fade } from '@material-ui/core/styles/colorManipulator' 

export default theme => ({
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
