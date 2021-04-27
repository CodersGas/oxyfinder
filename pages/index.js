import React, {useState, useEffect} from 'react';
import {Grid, Typography, Tabs, Tab, Box} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Head from 'next/head';
import FormComponent from 'components/form';
import InfoList from 'components/infoList';
import {NextSeo} from 'next-seo';

const useStyles = makeStyles(theme => ({
	topLeftContainer: {
	  background: `url('https://image.freepik.com/free-vector/drawn-man-wearing-adjustable-face-mask_23-2148801317.jpg')`,
	  backgroundRepeat: 'no-repeat',
	  backgroundSize: 'contain',
	  height: '400px',
	},
	topRightContainer: {
		background: 'linear-gradient(to right, #2980B9 0%, #6DD5FA 90%)',
	},
	tabStyle: {
		fontWeight: 500
	}
}))

const AntTabs = withStyles({
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const Home = () => {
	const classes = useStyles();

	const [tabValue, setTabValue] = useState(1);

	const handleTabChange = (e, newValue) => {
		setTabValue(newValue);
	}

	const updateTabValue = () => setTabValue(0);

  useEffect(() => {
    let firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
      appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
      databaseURL: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_DATABASE_URL
    }

    firebase.initializeApp(firebaseConfig);
  }, []);

  return (
  	<React.Fragment>
  		<NextSeo 
  			title='Oxy-Finder'
  			description='Find or add Info about the availability of oxygen with you or nearby you'
  		/>
	  	<Head>
		    <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js"></script>
	      <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-database.js"></script>
	      <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-analytics.js"></script>
	    </Head>
	    <Grid container >
	      <Grid container >
	        <Grid item md={4} xs={false} sm={false} className={classes.topLeftContainer} />
	        <Grid item md={8} xs={12} sm={12} className={classes.topRightContainer} >
	        	<Box height={1} justifyContent='center' display='flex' alignItems='center' >
		        	<Typography variant='h1' >
		        		OXY-FINDER
		        	</Typography>
	        	</Box>
	        </Grid>
	      </Grid>

	      <Grid container >
	      	<Box width={1} display='flex' justifyContent='center' >
	      		<AntTabs 
	      			color='primary'
	      			value={tabValue}
	      			onChange={handleTabChange}
	      		>
	      			<AntTab className={classes.tabStyle} label="I need Information" />
	      			<AntTab label="I Have Information" />
	      		</AntTabs>
	      	</Box>
	      </Grid>

	      <Grid container >
	      	{
	      		tabValue == 0 &&
	      		<InfoList />
	      	}

	      	{
	      		tabValue == 1 &&
	      		<FormComponent 
	      			updateTabValue={updateTabValue} 
	      		/>
	      	}
	      </Grid>
	    </Grid>
    </React.Fragment>
  )
}

export default Home;