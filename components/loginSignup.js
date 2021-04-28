import React from 'react';
import {Grid, Paper, Typography, Box} from '@material-ui/core';
import Button from 'components/button';
import Cookie from 'js-cookie';

const LoginSignup = (props) => {

	const {updateLoginValue} = props;

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
				var errorCode = err.code;
		    var errorMessage = err.message;
		    var email = err.email;
		    var credential = err.credential;
			})
	}

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
				</Box>
			</Grid>
		</Grid>
	)
}

export default LoginSignup;