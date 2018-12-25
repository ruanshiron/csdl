export default  theme => ({
  layout: {
    marginTop: 50,
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
  button: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit*2,
  },
});
