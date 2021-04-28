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
	},

	googleButtonStyles: {
		border: 'none',
		boxShadow: '0 1px 7px 1px #e8e8e8'
	}
}))

const CustomButton = (props) => {
	const classes = useStyles();

	const {type, disabled, handler} = props;

	let buttonStyle = '';

	if(type === 'submit') {
		buttonStyle = classes.submitButtonStyles;
	}else if(type === 'google login / signup') {
		buttonStyle = classes.googleButtonStyles;
	}

	return(
		<Button
			className={buttonStyle}
			size='large'
			type='submit'
			disabled={disabled}
			onClick={handler}
		>
			{type}
		</Button>
	)
}

export default CustomButton;