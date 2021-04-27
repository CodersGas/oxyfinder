import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	cancelRejectBtn: {
	  color: '#f44336',
	  border: '2px solid #f44336',
	  marginRight: '10px',
	  fontWeight: 700,
	  '&:hover': {
	  	backgroundColor: '#f44336',
	  	color: '#fff',
	  }
	},

	submitButtonStyles: {
	  color: '#00e676', 
	  border: '2px solid #00e676',
	  marginRight: '10px',
	  fontWeight: 700,
	  '&:hover': {
	  	backgroundColor: '#00e676',
	  	color: '#fff',
	  }
	}
}))

const CustomButton = (props) => {
	const classes = useStyles();

	const {type, disabled} = props;

	return(
		<Button
			className={classes.submitButtonStyles}
			size='large'
			type='submit'
			disabled={disabled}
		>
			{type}
		</Button>
	)
}

export default CustomButton;