import React, { Component } from 'react'
import styled from 'styled-components';
import RDTable from './components/RDTable';
import Columns from './components/Columns';
import Data from './components/Data';

const StyledCBContainer = styled.div`
  background-color:white;
  border:0.5px solid grey;
  color:black;
  font-weight:bold;
  font-style:italic;
  z-index:9999;
  width:auto;
  top:10px;
  left:30px;
  height:auto;
  position:absolute;
  padding:7px;
`;

const StyledContainerGrid = styled.div`

// .ReactTable .rt-tbody{
//   width:auto;
//   overflow:visible;
//   font-style:bold;
// }

// .rt-td{
//   color:gray;
//   border-right:0.06px solid gray;
// }

// .ReactTable.-striped .rt-tr.-odd{
//   background:lightgray;
// }

// .rt-th{
//   font-style:bold;
//   border:1px solid gray;
//   z-index:5;

// }

// .ReactTable{
//   width:700px !important;
// }

// .ReactTable .rt-tr .action{
//   transition: all .2s ease;
//   text-align:center
//   color:red;
//   transform:scale(0)
// }
// .ReactTable .rt-tr:hover .action{
//   transform: scale(1.3)
// }

// .ReactTable .rt-tr:hover .rt-td{
//   background:lightyellow
// }
`;


class App extends Component {

    constructor(props){
        super(props);

        this.state={

          columnWidths:[],

            posts:[]
        };
        
        this.initializeStickyColumnWidths=this.initializeStickyColumnWidths.bind(this);

    }

    componentDidMount(){

      this.initializeStickyColumnWidths();
        // const url  = "https://jsonplaceholder.typicode.com/posts";
        //     fetch(url,{
        //     method:"GET"
        //     }).then(response => response.json()).then(posts => {
        //     this.setState({posts});
        //     })
        }
  
    getTheadThProps(state , rowInfo , column , instance){

      return{
        onClick:(e,handleOriginal) =>{

        },
        onContextMenu:(e)=>{
          alert("context menu...")
        }
      };
    }

    defaultSortMethod(){
      return;
    }

    getTdProps(state,rowInfo , column , instance){
      return{
        onClick:(e,handleOriginal)=>{

        },
        onDoubleClick:(e,handleOriginal)=>{

        }
      };
    }

    initializeStickyColumnWidths(){
      let finalWidthToAccomodateStickyColumns = 0;
      let checkBoxColumnWidth;
      const that = this;

      Columns.
              map(function(data,index){
                  if(data.locked){
                    if(index === 0){
                      checkBoxColumnWidth = 30;
                    }
                    else
                    {
                      checkBoxColumnWidth = 0;
                    }
                    let returnWidth = that.addColumnWidth(finalWidthToAccomodateStickyColumns,data.width !== undefined ? data.width : 100 , checkBoxColumnWidth);
                    finalWidthToAccomodateStickyColumns=returnWidth;
                  }
              });
    }


    addColumnWidth(a,b,checkBoxColumnWidth){
      let finalWidth = parseInt(a)+parseInt(b)+parseInt(checkBoxColumnWidth);
      finalWidth = finalWidth+"px";
      this.setState({columnWidths:this.state.columnWidths.push(finalWidth)});
      return finalWidth;

    }

    render() {
        return (
        <StyledContainerGrid>
        <div>
            <RDTable
                            ref="DataTableRef"
                            className="DataTableEg"

                            columns={Columns}
                            data={Data}
                            showSearchBox={false}
                            accomodateStickyColumnsWidth={this.state.columnWidths}

                            // showFilterToggler={false}
                            // showColumnChooser={false}
            />
        </div>
            
        </StyledContainerGrid>
        )
    }
}


export default App;