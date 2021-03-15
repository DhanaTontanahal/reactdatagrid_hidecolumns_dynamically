import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
	color:${props =>props.primary === "GreenOK" ? "blue" : props.primary === "MyWish" ? "grey":props.primary === "Single" ? "red":"green"};
`;


const ColumnFormatter = function(value){
	return(
			<StyledCell primary={value}>
				<b>{value}</b>
			</StyledCell>
		);
};

const Columns = [

	{
		Header:"ID",
		accessor:"id",
		filterable:true,
		style:{
			textAlign:"center",
		},
		width:100,
		show:true,
		locked:true,

	},
	{

		Header:"Column2",
		accessor:"column2",
		filterable:true,
		editable:true,
		// noColumnContextMenu:true,
		style:{
			textAlign:"center"
		},
		width:100,
		show:true,
		locked:true
	},
	{
		Header:"Column3",
		accessor:"column3",
		filterable:true,
		style:{
			textAlign:"center",
		},
		width:100,
		show:true


	},
	{
		Header:"Column 4",
		accessor:"column4",
		filterable:true,
		Cell:({value}) => ColumnFormatter(value),
		width:100,
		show:true
	},
	{
		Header:"Column 5",
		accessor:"column5",
		filterable:true,
		style:{
			textAlign:"center"
		},
		width:100,
		show:true

	},

	

];


export default Columns;