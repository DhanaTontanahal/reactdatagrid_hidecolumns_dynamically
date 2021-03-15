import React, {Component} from 'react';
import {DynamicColumnContextMenuUtil} from './DynamicColumnContextMenuUtil';

function columnChoose(index,elem){

	const {columnsFinalized} = this.state;

	columnsFinalized[index].checked = !columnsFinalized[index].checked;

	this.setState(
		() =>{
			const finalizeColumns = [];
			finalizeColumns.push(...columnsFinalized);
			if(finalizeColumns[index].show != undefined){
				elem.show = !elem.show;
			}
			if(finalizeColumns[index].columns != undefined){
				elem.columns[0].show = !elem.columns[0].show;

			}
			this.props.onChange({columnsFinalized:finalizeColumns});
			if(finalizeColumns[index].columnsFinalized){
				finalizeColumns[index].columnsFinalized.forEach(item => {
					item.show = !item.show
				});
			}
			return{
				columnsFinalized:finalizeColumns,
			};
		}, () => {

		}
	); 
}

function rendercolumnsFinalized(){

	const {columnsFinalized , filterText} = this.state;
	if(filterText === "" || !filterText){
		return columnsFinalized
								.map((checkbox,index) => 
								<div key={index}>
									<label>
										<input
											type="checkbox"
											checked={checkbox.checked}
											onChange={columnChoose.bind(this, index , checkbox)}
										/>
											&nbsp;
											{checkbox.label}
										</label>
									</div>
								);
	}

	return columnsFinalized.filter(function(checkbox){
		return checkbox.label.toString().toLowerCase().includes(filterText.toLowerCase())
	})
	 .map((checkbox, index) =>
	 	<div key={index}>
	 	<label>
	 	<input 
	 		type="checkbox"
	 		checked={checkbox.checked}
	 		onChange={columnChoose.bind(this,index,checkbox)}
	 	/>
	 	&nbsp;
	 	{checkbox.label}
	 	</label>
	 	</div>

	 	);
}

class ColumnChooser extends Component{
	constructor(props){
		super(props);
		this.state={
			filterText:""
		}


		this.handleTheFilter = this.handleTheFilter.bind(this);

	}


	hideColumnChooser(){

	}

	componentWillMount(){
		const columnsFinalized = [];
		const columns =  this.props.columns;
		columns.map(function(data,index){
			const checkbox = DynamicColumnContextMenuUtil(data['Header']);
			const columnObjAttachedToCheckBoxObj = Object.assign({} , data , checkbox);
			columnsFinalized.push(columnObjAttachedToCheckBoxObj);
		});
		this.setState({columnsFinalized});
	}

	componentDidMount(){

	}

	handleTheFilter(event){
		this.setState({filterText:event.target.value});
	}

	clearFilters(){
		this.setState({filterText:""});
	}

	componentWillUnMount(){
		this.hideColumnChooser();
	}

	render(){

		return(
		<div>
			<input type="text" style={{marginLeft:"1px" ,width:"150px" , color:"grey" }} placeholder="Search..." value={this.state.filterText} onChange={this.handleTheFilter.bind(this)} />
			<hr />
			<span>
			   {rendercolumnsFinalized.call(this)}
			</span>
			<hr />
			<button onClick={this.clearFilters.bind(this)} style={{color:"black", fontStyle:"italic"}}>clearFilters</button>
		</div>
			);
	}
}


export default ColumnChooser;