import React , {Component} from 'react';
import {ContextMenuUtility} from './ContextMenuUtility';
import styled from 'styled-components';

const StyledIcon = styled.div`

	#menuIcon{
		background-color:white;
		animation: 2s fadeIn;
		animation-fill-mode :forwards;
		color:grey;
		visibility:hidden;
		margin-left:10px;

	}

	#columnNamePlacemen{
		display:inline-block;
		animation: 4s fadeIn;
		animation-fill-mode :forwards;
		width:60px;
		white-space:nowrap;
		overflow:hidden !important;
		text-overflow : ellipsis !important;
		float:left;
	}

	@keyframes fadeIn{
		0%{
			opacity:0;
		}
		100%{
			visibility:visible;
			opacity:1
		}

	}
`;
class HeaderMenuWidget extends Component{

	constructor(props){
		super(props);
		this.ContextMenu = this.ContextMenu.bind(this);
		this.openContextMenu = this.openContextMenu.bind(this);

		this.state={
			showContextMenu:false
		};
	}

	openContextMenu(){
		console.log("openContextMenu")
	}

	ContextMenu(){
		return(
				<div>
					{
						<div>
							{this.props.item}
						</div>
					}
				</div>
			);
	}

	showContextMenu(){
		return;
	}

	render(){
		return(
				<StyledIcon>
					<div id="columnNamePlacemen">
						<span>{this.props.columnName}</span>
					</div>
					<div ref={ContextMenuUtility(true,this.props.columnName.trim(), this.ContextMenu,this.props.columnsArr)}>
						<button id="menuIcon">lll</button>
					</div>
				</StyledIcon>
			);
	}
}

export default HeaderMenuWidget;