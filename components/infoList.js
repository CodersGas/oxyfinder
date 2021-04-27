import React, {useEffect, useState} from 'react';
import {Grid, Table, TableHead, TableRow, TableBody, TableContainer, TableCell, Box} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {INFO_TABLE_HEADS} from 'utils/constants';

const InfoList = (props) => {


	const [oxyData, setOxyData] = useState(null);
 
	function gotData(data){
    let infoData = data.val();
    if(Object.keys(infoData).length > 0) {
			setOxyData(infoData);
		}else {
			setOxyData(null);
		}
	}

	function errData(err){
    console.log('Error!');
    console.log(err)
	}

	useEffect(() => {
		let database = firebase.database();
    let ref = database.ref('data');

    ref.on('value', gotData, errData);
	}, []);

	return(
		<Grid container justify='center' >
			<Grid item md={8} xs={12} sm={12} >
				<TableContainer style={{padding: 8}} >
					<Table>
						<TableHead>
							<TableRow>
								{
									INFO_TABLE_HEADS.map((head, index) => (
										<TableCell key={head} >
											{head}
										</TableCell>
									))
								}
							</TableRow>
						</TableHead>

						{
							oxyData &&
							<TableBody>
								{
									Object.keys(oxyData).map((key) => (
										<TableRow key={key} >
											<TableCell>
												{oxyData[key].name}
											</TableCell>

											<TableCell>
												{oxyData[key].phoneNumber}
											</TableCell>

											<TableCell>
												{oxyData[key].alternatePhoneNumber == "" ? "-" : oxyData[key].alternatePhoneNumber}
											</TableCell>

											<TableCell>
												{oxyData[key].address == "" ? oxyData[key].address : oxyData[key].address}
											</TableCell>

											<TableCell>
												{oxyData[key].city}
											</TableCell>

											<TableCell>
												{oxyData[key].state}
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						}
					</Table>
				</TableContainer>
				{
					!oxyData &&
					<Box width={1} mt={2} display='flex' justifyContent='center' >
						<Alert severity='warning' color='warning' >
							No Info Available
						</Alert>
					</Box>
				}
			</Grid>
		</Grid>
	)
}

export default InfoList;