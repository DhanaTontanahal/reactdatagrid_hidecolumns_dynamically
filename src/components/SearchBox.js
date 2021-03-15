import React from 'react';
import styled from 'styled-components';


const  StyledSearchBox = styled.div`
	float:left;
	padding:0.5px 8px;
	border:0.5px 8px solid grey;
	margin:2px 6.5px
`; 

class SearchBox extends React.Component{

	constructor(props){
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}


	handleKeyPress(e){
		this.props.onChange({searchTerm:e.target.value});
	}


	static filterData(data, filter){

		if(filter === "" || !filter){return data;}
	
		return(
				data.filter(function(o){
					return (
						Object.keys(o).some(function(v){
							return o[v].toString().toLowerCase().includes(filter.toLowerCase());
						})
					);
				})
			);

	}
	render(){
		return(
				<StyledSearchBox>
					<span>
						<input type="text" onKeyPress={this.props.onKeyPress} placeholder="Search" onChange={this.handleKeyPress} value={this.props.searchTerm} />
					</span>
				</StyledSearchBox>
			);
	}


}

export default SearchBox;