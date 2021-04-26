import React from 'react';
import {Grid, Typography, Tabs, Tab, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	topLeftContainer: {
	  background: `url('https://image.freepik.com/free-vector/drawn-man-wearing-adjustable-face-mask_23-2148801317.jpg')`,
	  backgroundRepeat: 'no-repeat',
	  backgroundSize: 'contain',
	  height: '400px',
	}
}))

const Home = () => {
	const classes = useStyles();

  return (
    <Grid container >
      <Grid container >
        <Grid item md={4} xs={false} sm={false} className={classes.topLeftContainer} />
      </Grid>
    </Grid>
  )
}

export default Home;