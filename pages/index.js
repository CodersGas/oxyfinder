import React, {useState, useEffect} from 'react';
import {Grid, Typography, Tabs, Tab, Box, Fab} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Head from 'next/head';
import FormComponent from 'components/form';
import InfoList from 'components/infoList';
import UserSubmittedList from 'components/userSubmittedList';
import {NextSeo} from 'next-seo';
import LoginSignup from 'components/loginSignup';
import Cookie from 'js-cookie';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles(theme => ({
	topLeftContainer: {
	  background: `url('https://image.freepik.com/free-vector/drawn-man-wearing-adjustable-face-mask_23-2148801317.jpg')`,
	  backgroundRepeat: 'no-repeat',
	  backgroundSize: 'contain',
	  height: '200px',
	},
	topRightContainer: {
		background: 'linear-gradient(to right, #2980B9 0%, #6DD5FA 90%)',
	},
	svgStyle: {
		position: 'fixed',
		bottom: 0
	},
	fabStyle: {
		position: 'fixed',
		bottom: 30,
		right: 30
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

	/* states declarations start */
	
	const [tabValue, setTabValue]   = useState(1);
	const [loggedIn, setIsLoggedIn] = useState(false);
	const [editData, setEditData]   = useState({choice: false, editId: null});
	
	/* states declarations end */


	/* Handlers start */

	const handleTabChange = (e, newValue) => {
		setTabValue(newValue);
		setEditData({choice: false, editId: null});
	}
	
	const updateTabValue = (value) => {
		setTabValue(value);
		setEditData({choice: false, editId: null});
	}
	
	const updateLoginValue = (value) => setIsLoggedIn(value);
	
	const handleLogout = () => {
		window.location.reload();
		Cookie.remove('user')
	}

	const updateEditDataState = (editId) => {
		setEditData({choice: true, editId: editId});
		setTabValue(1);
	}

	/* Handlers end */


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

    if(Cookie.get('user')) {
    	updateLoginValue(true);
    }
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
	      <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-auth.js"></script>
	    </Head>
	    <Grid container >
	      <Grid container >
	        
	      	<Grid item md={4} xs={false} sm={false} className={classes.topLeftContainer} />
	        
	        <Grid item md={8} xs={12} sm={12} className={classes.topRightContainer} >
	        	<Box height={1} justifyContent='center' display='flex' alignItems='center' flexDirection='column' >
		        	<Typography variant='h1' >
		        		OXY-FINDER
		        	</Typography>

		        	<Box mt={1} textAlign='center' p={2} >
		        		<Typography style={{color: '#fff', fontWeight: 500, fontSize: 16}} >
		        			Why let precious lives be lost, when we can save them. <br />Lets help people get the quick information about where they can find the oxygen cylinders or refillings
		        			to save their precious ones. &#128591;
		        		</Typography>
		        	</Box>
	        	</Box>
	        </Grid>
	        
	        <svg className={classes.svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					  <path fill="#0099ff" fillOpacity="0.2" d="M0,96L80,128C160,160,320,224,480,250.7C640,277,800,267,960,245.3C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
					</svg>
	      </Grid>

      	<Grid container >
	      	<Box width={1} display='flex' justifyContent='center' >
	      		<AntTabs 
	      			color='primary'
	      			value={tabValue}
	      			onChange={handleTabChange}
	      		>
	      			<AntTab label="I need Information" />
	      			<AntTab label="I Have Information" />
	      			{
	      				loggedIn &&
	      				<AntTab label="My Submitted Information" />
	      			}
	      		</AntTabs>
	      	</Box>
	      </Grid>

	      <Grid container >
	      	{
	      		tabValue == 0 &&
	      		<InfoList />
	      	}

	      	{
	      		tabValue == 1 && loggedIn &&
	      		<FormComponent 
	      			updateTabValue={updateTabValue} 
	      			editData={editData}
	      		/>
	      	}
	      	
	      	{
	      		tabValue == 1 && !loggedIn &&
	      		<LoginSignup 
	      			updateLoginValue={updateLoginValue}
	      		/>
	      	}

	      	{
	      		tabValue == 2 &&
	      		<UserSubmittedList updateEditDataState={updateEditDataState} />
	      	}
	      	
	      </Grid>
				{
					loggedIn &&
					<Fab onClick={handleLogout} color='secondary' variant='extended' className={classes.fabStyle} >
						<PowerSettingsNewIcon />
						Logout
					</Fab>
				}
	    </Grid>
    </React.Fragment>
  )
}

export default Home;