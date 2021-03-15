import React , {Component} from 'react';
import ReactDOM from 'react-dom';


class ContextMenu extends Component{

	constructor(){
		super();
	}

	static createContextMenu(overRideOnClose=false,id , ContextMenu , columns){

		var container = document.createElement('div');
		container.setAttribute("id" , id);

		container.style.position = 'absolute';


		function onClose(){
			if(!container.parentNode) return;
			document.body.removeChild(container);
			ReactDOM.unmountComponentAtNode(container);
			document.body.removeEventListener('mousedown', onHideContextMenu);

		}

		if(!overRideOnClose){
			onClose();
		}

		function dummyOnClose(){

		}

		function onShowContextMenu(e){
			columns.map(function(o){
				if(o['Header'] !== id){
					const container =  document.getElementById(o['Header']);
					if(container !== null){
						document.body.removeChild(container);
					}
				}

			});

			container.style.left = e.pageX + 'px';
			container.style.top = e.pageY + 'px';

			document.body.appendChild(container);

			ReactDOM.render(React.createElement(ContextMenu,{
				onClose:onClose?overRideOnClose == true:dummyOnClose
			}),container);
			e.stopPropagation();
			if(!overRideOnClose){
				document.body.addEventListener('mousedown' , onHideContextMenu);
			}
		}


		function onHideContextMenu(e){

			if(isInsideContainer(e.target , container)) return;
			if(!overRideOnClose)
				onClose();
		}

		function isInsideContainer(target , container){
			while(target != document.body){

				if(target == container) return true;
				target = target.parentNode;
			}
			return false;
		}


		var targetElement;

		return function(el){
			if(el){
				targetElement = el;
				el.addEventListener('mousedown' , onShowContextMenu);
			}
			else
			{

				targetElement.removeEventListener('mousedown', onShowContextMenu);
				if(!overRideOnClose)
					onClose();
			}
		};


	}
}


export default ContextMenu;