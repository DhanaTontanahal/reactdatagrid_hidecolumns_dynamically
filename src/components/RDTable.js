import React , {Component} from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import * as css from 'react-table/react-table.css';
import {DynamicColumnContextMenuUtil} from './DynamicColumnContextMenuUtil';
import ColumnChooser from './ColumnChooser';
import SearchBox from './SearchBox';
import HeaderMenuWidget from './HeaderMenuWidget';
import styled from 'styled-components';


const StyledCBContainer = styled.div`
	background-color:grey;
	border:0.5px solid grey;
	color:white;
	font-weight:bold;
	font-color:white;
	font-style:italic;
	z-index:9999;
	width:180px;
	height:auto;
	position:absolute;
	padding:7px;
`;

const StyledContainer = styled.div`

#gridDiv{
	border:1px solid grey;
	background-color:transparent;

}
.ReactTable .rt-tbody{
	width:auto;
	overflow:visible;
	font-style:bold;
}

.ReactTable .rt-table{
	width:auto;
	overflow:visible;
	font-style:bold;
}
	// .rt-td:first-child,
	// .rt-th:first-child{
	// 	left:0;
	// 	position:sticky !important;
	// 	z-index:2;
	// }

	.rt-td:first-child
	{
		left:0;
		position:sticky !important;
		z-index:2;
	}


	.fixed{
		position:sticky !important;
		z-index:2;
	}
	.rowSelected{
		background:lightgreen !important;
		color:gray !important;
	}

	.rowSelected > .fixed{
		background:lightgreen;
	}

.left0{
	left:30px;
}
${({ left }) => {

		let templateLiteral  = ``;
		left.forEach((val,index) =>{
			templateLiteral += `
				.left${index+1}{
					left:${val};
				}
			`;
		});
		return templateLiteral;
	}}

.ReactTable .rt-thead.-header{
	height:45px;
	z-index:10;
	background-color:gray;
	color:white;
}
`;
let that;
class RDTable extends Component{

	constructor(props){

		super(props);

		this.dragged = null;
		this.reorder = [];
		 that = this;
		this.state = {
			showSearchBox:this.props.showSearchBox,
			searchTerm:"",
			columnsFinalized:[],
			originalMutatedColumns:[],
			showMenuIcon:false,
			loading:this.props.loading,
			toggleFilter:this.props.toggleFilter,
			stripedStyle:"striped",
			defaultPageSize:10,
			showTargetMenu:this.props.showTargetMenu,
			showContextMenu:this.props.showContextMenu,
			trigger:0,
			data:this.props.data,
			accomodateStickyColumnsWidth:this.props.accomodateStickyColumnsWidth,
		};
		this.onKeyPress =this.onKeyPress.bind(this);
	}

		updateFilterData = (searchTerm,filteredData)=>{

			if(searchTerm === "" || searchTerm===" "||searchTerm===null){
				this.setState({data:this.props.data});
			}
			else{
				this.setState({data:filteredData});
			}
		} 

		getData() {
		const data = this.state.data;
		return data;
		}

		onKeyPress(event){
			if(event.key == 'Enter'){
				const data = this.state.data;
				const filteredData = SearchBox.filterData(this.state.data,this.state.searchTerm);
				this.updateFilterData(this.state.searchTerm , filteredData);
			}
		}

	
		logSelection = () => {
		};

		closeContextMenu(id){
			var container = document.getElementById(id);
			document.body.removeChild(container);
		}

		handleToggleFilter(){
			this.setState({toggleFilter:!this.state.toggleFilter})
		}

		handleToggleContextMenu(){

		}

		columnContextMenu(header){
		}

		mountEvents() {
			var headers = Array.prototype.slice.call(document.querySelectorAll(".rt-th"));
			headers.forEach((header, i) => {
			header.setAttribute("draggable", true);

			header.ondragstart = e => {
				e.stopPropagation();
				this.dragged = i;
			};


			header.ondrag = e => e.stopPropagation();
			
			header.ondragend = e =>{ 
				e.stopPropagation();
				setTimeout(() => (this.dragged=null),1000);
			};

			header.ondragover = e =>{ 
				e.preventDefault(); 
			};

			

			header.ondrop = (e) => {
				e.preventDefault();
				this.reorder.push({a:i , b:this.dragged});
				this.forceUpdate();
			};
			});
		}

		componentDidUpdate(){
			this.mountEvents();
		}

		handleMouseOverTargetCM(){
			this.setState({showContextMenu:true})
		}

	getTheHeaderMenuWidget(col){
		if(col.noColumnContextMenu){
			return(
					<span className="draggable-header">
						{col.Header}
					</span>
				)
		}
		else{
			return(
			<div onMouseOver={this.handleMouseOverTargetCM.bind(this)}>
				<div style={{display:"inline-block"}}>
					{
					!this.state.showContextMenu?
						<span>{col.Header}</span>
						:null
					}
				</div>
				{	
					this.state.showContextMenu?


				<HeaderMenuWidget
						item={
							<div>
								<StyledCBContainer>
									<button onClick={()=>this.closeContextMenu(col.Header)}>CLose</button>
									<hr />
									<ColumnChooser onChange={this.setState.bind(this)} columnsFinalized={this.state.columnsFinalized} columns={this.props.columns}/>
								</StyledCBContainer>
							</div>
						}
						columnName={col.Header}
						columnKey={col.accessor}
						columnsArr={this.state.columnsFinalized}
				/>
				:null
			}
		</div>		
		);
	}
}

	handleMouseOverTargetCMFalse(){
		this.setState({showContextMenu:false});
	}

	initializeGrid(){
		const columnsFinalized=[];
		const columns = this.props.columns;
		columns.map(function(data,index){
			const checkbox = DynamicColumnContextMenuUtil(data['Header']);
			const columnObjAttachedtoCheckBoxObj = Object.assign({} , data , checkbox);
			columnsFinalized.push(columnObjAttachedtoCheckBoxObj);

		});
			this.setState({columnsFinalized,originalMutatedColumns:columnsFinalized});

	}

	getTheSelectedData(){
	}
	hideLoadingMessage(){
		this.setState({loading:!this.state.loading})
	}
	hideColumnChooser(){

	}
	componentDidMount(){
		const data = this.getData();
		this.setState({data})
		this.initializeGrid();
		this.hideColumnChooser();
		this.hideLoadingMessage();
		this.mountEvents();
	}

	cellFormatter(column , value){
		if(column.Cell === undefined){
			return(
				<span className={column.headerClassName}>{value}</span>
				);
		}
		else{
			return(
				<span className={column.className}>{value}</span>
				);
		}
	}

	renderEditable(cellInfo){

			return(
					<div
						contentEditable
						suppressContentEditableWarning
						onBlur={ e => {
							const data = [...this.state.data];
							data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
							e.target.innerHTML = this.state.data[cellInfo.index][cellInfo.column.id];
							this.setState({data});
						}}

						>
						{this.state.data[cellInfo.index][cellInfo.column.id]}
					</div>
				);
	}

	initializeColumns(){
		let reOrderStckyColumn=[];

		const cols = this.state.columnsFinalized.map((col,index)=>{
			if(col.locked){
				reOrderStckyColumn.push({a:reOrderStckyColumn.length,b:index});

				const classNames = `fixed left${reOrderStckyColumn.length-1}`;
					
				return{
					...col,
					Header:this.getTheHeaderMenuWidget(col),
					headerClassName:classNames,
					className:classNames,
					resizable:false,
					Cell:!col.editable ? col.Cell : this.renderEditable.bind(this)
				};

			}
			else
			{
				return{
					...col,
					Header:this.getTheHeaderMenuWidget(col),
					Cell:!col.editable ? col.Cell : this.renderEditable.bind(this)
				};
			}
		});

		if(this.reorder.length === 0){
			this.reorder = reOrderStckyColumn;
		}
		this.reorder.forEach(reorderObject => cols.splice(reorderObject.a , 0 , cols.splice(reorderObject.b , 1)[0]));

		return cols;
	}

 render(){

	let reOrderStckyColumn=[];

		const cols = this.state.columnsFinalized.map((col,index)=>{
			if(col.locked){
				reOrderStckyColumn.push({a:reOrderStckyColumn.length,b:index});

				const classNames = `fixed left${reOrderStckyColumn.length-1}`;
					
				return{
					...col,
					Header:this.getTheHeaderMenuWidget(col),
					headerClassName:classNames,
					className:classNames,
					resizable:false,
					Cell:!col.editable ? col.Cell : this.renderEditable.bind(this)
				};

			}
			else
			{
				return{
					...col,
					Header:this.getTheHeaderMenuWidget(col),
					Cell:!col.editable ? col.Cell : this.renderEditable.bind(this)
				};
			}
		});

		if(this.reorder.length === 0){
			this.reorder = reOrderStckyColumn;
		}

		if(this.reorder.length === 10){
			this.reorder = [];
		}

		this.reorder.map(function(reOrderObj){
			if(reOrderObj.a === null || reOrderObj.b === null){
				that.reorder = [];
				return;
			}
		});

		this.reorder.forEach(reorderObject => cols.splice(reorderObject.a , 0 , cols.splice(reorderObject.b , 1)[0]));

		const propsClassName = "-striped -highlight "+this.props.className;
		return(
				<StyledContainer onMouseLeave={this.handleMouseOverTargetCMFalse.bind(this)} left={this.state.accomodateStickyColumnsWidth}>
					<div id="gridDiv">
					{
							(!!this.state.showSearchBox)?
								<SearchBox onKeyPress={this.onKeyPress} onChange={this.setState.bind(this)} searchTerm={this.state.searchTerm}/>
							:null
					}
					<ReactTable
						className="-striped -highlight"
						data={this.state.data}

						columns={cols}
						defaultPageSize={10}
						resizable={this.props.resizable}
						noDataText={this.props.noDataText}
						minRows={this.props.minRows}
						showPagination={this.props.showPagination}
						loading={this.state.loading}
						filterable={this.props.filterable}
						loadingText={this.props.loadingText}
						sortable={this.props.sortable}
						getTheadThProps={this.props.getTheadThProps}
						getTdProps={this.props.getTdProps}
						SubComponent={this.props.SubComponent}
						getTrProps={this.props.getTrProps}
						
						style={{
							height:"500px",
							width:"800px"
						}}
						
				/>

					</div>
					
				</StyledContainer>
		);
	}
}

RDTable.defaultProps={

	showSearchBox:true,
	toggleFilter:false,
	showPagination:true,
	loading:true,
	minRows:5,
	noDataText:"No items to show",
	loadingText:"loading...",
	resizable:true,
	showFilterToggler:true,
	sortable:true,
	showTargetMenu:false,
	showContextMenu:false

}
export default RDTable;