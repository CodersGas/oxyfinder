import React, {useState, useEffect} from 'react';
import {Grid, Paper, Typography, Box} from '@material-ui/core';
import Button from 'components/button';
import Cookie from 'js-cookie';

const LoginSignup = (props) => {

	const {updateLoginValue} = props;

	const [error, setError] = useState(false);

	const handleLogin = () => {
		let authProvider = new firebase.auth.GoogleAuthProvider();

		firebase.auth()
			.signInWithPopup(authProvider)
			.then((result) => {
				var credential = result.credential;

				var token = credential.accessToken;
				var user  = {
					'user_name'  : result.user.displayName,
					'user_image' : result.user.photoURL,
					'user_email' : result.user.email
				};

				Cookie.set('user', user, {expires: 1});
				updateLoginValue(true);

			}).catch((err) => {
				console.log('error while login ', err);
		    setError(true);
			});
	}

	useEffect(() => {

		if(error) {
			setTimeout(() => {setError(false)}, 3000);
		}

	}, [error]);

	return(
		<Grid container justify='center' >
			<Grid item md={6} xs={12} sm={12} >
				<Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' >
					<Box my={3} >
						<Typography variant='h5' >
							Login Using Google
						</Typography>
					</Box>

					<Button 
						type="google login / signup"
						handler={handleLogin}
					/>

					<Box mt={2} >
						<Typography style={{fontSize: 14, fontStyle: 'italic'}} >
							Your email or any other information will not be used for any marketting purposes and only will be used to provide better user experience on site.
						</Typography>
					</Box>

					{
						error &&
						<Box mt={3} >
							<Typography>
								Oops! Something went wrong. Please try again
							</Typography>
						</Box>
					}
				</Box>
			</Grid>
		</Grid>
	)
}

export default LoginSignup;