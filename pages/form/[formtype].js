import React, {useEffect, useState} from 'react';
import FormComponent from 'components/form';
import Head from 'next/head';

const Form = (props) => {
	return (
		<React.Fragment>
			<Head>
	      <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js"></script>
	      <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-database.js"></script>
	      <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-analytics.js"></script>
	    </Head>
			<FormComponent />
		</React.Fragment>
	)
}

export default Form;