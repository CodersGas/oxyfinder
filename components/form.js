import React, {useState} from 'react'
import {Grid, TextField, Slide} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import Button from 'components/button';
import {PHONE_NUMBER_VALIDATION} from 'utils/constants';
import moment from 'moment';
import Cookie from 'js-cookie';

const ValidationSchema = yup.object().shape({
	name: yup
				.string()
				.matches(/^[a-zA-Z\s]+$/, 'Please enter valid name')
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
				.matches(/^[a-zA-Z\s]+$/, 'Please enter valid city')
				.required('This field is required'),
	state: yup
				.string()
				.matches(/^[a-zA-Z\s]+$/, 'Please enter valid state')
				.required('This field is required')
});

const FormComponent = (props) => {

	const {updateTabValue} = props;

	const [submitted, setSubmitted] = useState(false);

	return(
		<Grid container justify='center' >
			{
				submitted &&
				<Grid container justify='center' >
					<Slide in={submitted} direction='left'  >
						<Alert severity='success' color='success' style={{margin: '10px 0'}} >
							Thankyou for your contribution &#128591;
						</Alert>
					</Slide>
				</Grid>
			}
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
						let database    = firebase.database();
						let databaseRef = database.ref('data');

						values.updatedAt = moment().format('lll');
						values.userEmail = JSON.parse(Cookie.get('user')).user_email;

						databaseRef.push(values, function(err) {
							if(err) {
								console.log('error saving data');
								setSubmitted(false);
							}else {
								console.log('data submitted successfully')
								setSubmitted(true);
								setTimeout(() => {updateTabValue(0)}, 3000);
							}
						});

						setSubmitting(false);
					}}
				>
					{({values, errors, touched, handleChange, setFieldValue, isSubmitting}) => (
						<Form style={{padding: 8}} >
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
								<Button type="submit" disabled={isSubmitting} />
							</Grid>
						</Form>
					)}
				</Formik>
			</Grid>	

		</Grid>
	)
}

export default FormComponent;