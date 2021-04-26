import React, {useEffect, useState} from 'react'
import {Grid, TextField} from '@material-ui/core';
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import Button from 'components/button';
import {PHONE_NUMBER_VALIDATION} from 'utils/constants';

const ValidationSchema = yup.object().shape({
	name: yup
				.string()
				.min(4, 'Please enter valid name')
				.required('This field is required'),
	phoneNumber: yup
							.string()
							.matches(PHONE_NUMBER_VALIDATION, 'Invalid phone number')
							.required('This field is required'),
	alternatePhoneNumber: yup
							.string()
							.max(10, 'Invalid Phone Number'),
	address: yup
					.string()
					.min(10, 'Please Enter more details'),
	city: yup
				.string()
				.required('This field is required'),
	state: yup
				.string()
				.required('This field is required')
});

const FormComponent = (props) => {

	const [firebaseInit, setFirebaseInit] = useState(null);
	
  useEffect(() => {
    let firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
      appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
      databaseURL: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_DATABASE_URL
    }

    setFirebaseInit(firebase.initializeApp(firebaseConfig));
  }, []);

	return(
		<Grid container justify='center' >
			<Grid item md={6} xs={12} sm={12} >
				<Formik
					initialValues={{
						name: "",
						phoneNumber: "",
						alternatePhoneNumber: "",
						address: "",
						city: "",
						state: ""
					}}

					validationSchema={ValidationSchema}

					onSubmit={async(values, {setSubmitting}) => {
						console.log('form values -> ', values);
						let database    = firebaseInit.database();
						let databaseRef = database.ref('data');

						databaseRef.push(values);

						setSubmitting(false);
					}}
				>
					{({values, errors, touched, handleChange, setFieldValue}) => (
						console.log('values -> ', values),
						<Form>
							<Grid item md={12} xs={12} sm={12} style={{marginTop: 16}} >
								<TextField 
									id="name"
									name="name"
									color="primary"
									variant="outlined"
									fullWidth
									placeholder="Please Enter your name (eg -: Ashish Kumar)"
									label="Name"
									value={values.name}
									onChange={handleChange}
									error={errors.name && touched.name}
									helperText={errors.name && touched.name ? errors.name : ''}
								/>
							</Grid>

							<Grid item md={12} xs={12} sm={12} style={{marginTop: 16}} >
								<TextField 
									id="phoneNumber"
									name="phoneNumber"
									color="primary"
									variant="outlined"
									fullWidth
									placeholder="Please Enter your phone number"
									label="Phone Number"
									value={values.phoneNumber}
									onChange={handleChange}
									error={errors.phoneNumber && touched.phoneNumber}
									helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}
								/>
							</Grid>

							<Grid item md={12} xs={12} sm={12} style={{marginTop: 16}} >
								<TextField 
									id="alternatePhoneNumber"
									name="alternatePhoneNumber"
									color="primary"
									variant="outlined"
									fullWidth
									placeholder="Please Enter your alternate phone number"
									label="Alternate Phone Number"
									value={values.alternatePhoneNumber}
									onChange={handleChange}
									error={errors.alternatePhoneNumber && touched.alternatePhoneNumber}
									helperText={errors.alternatePhoneNumber && touched.alternatePhoneNumber ? errors.alternatePhoneNumber : ''}
								/>
							</Grid>

							<Grid item md={12} xs={12} sm={12} style={{marginTop: 16}} >
								<TextField 
									id="address"
									name="address"
									color="primary"
									variant="outlined"
									fullWidth
									placeholder="Please enter the address"
									label="Address"
									value={values.address}
									onChange={handleChange}
									error={errors.address && touched.address}
									helperText={errors.address && touched.address ? errors.address : ''}
								/>
							</Grid>

							<Grid container spacing={2} style={{marginTop: 16}} >
								<Grid item md={6} xs={12} sm={12} >
									<TextField 
										id="city"
										name="city"
										color="primary"
										variant="outlined"
										fullWidth
										placeholder="Choose city"
										label="City"
										value={values.city}
										onChange={handleChange}
										error={errors.city && touched.city}
										helperText={errors.city && touched.city ? errors.city : ''}
									/>
								</Grid>
								<Grid item md={6} xs={12} sm={12} >
									<TextField 
										id="state"
										name="state"
										color="primary"
										variant="outlined"
										fullWidth
										placeholder="Choose state"
										label="State"
										value={values.state}
										onChange={handleChange}
										error={errors.state && touched.state}
										helperText={errors.state && touched.state ? errors.state : ''}
									/>
								</Grid>
							</Grid>

							<Grid container justify='center' style={{marginTop: 16}} >								
								<Button type="submit" />
							</Grid>
						</Form>
					)}
				</Formik>
			</Grid>	

		</Grid>
	)
}

export default FormComponent;