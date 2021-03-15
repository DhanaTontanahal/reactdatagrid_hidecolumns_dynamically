 const Columns = [
    {
        Header:"User ID",
        accessor:"userId",
        filterable:true,
        style:{
            textAlign:"center",
        },
        width:100,
        maxWidth:100,
        minWidth:100
    },
    {
        Header:"ID",
        accessor:"id",
        filterable:true,
        style:{
            textAlign:"center"
        },
        width:100,
        maxWidth:100,
        minWidth:100
    },
    {
        Header:"Title",
        accessor:"title",
        sortable:false,
        filterable:false
    },
    {
        Header:"Body",
        accessor:"body",
        sortable:false,
        filterable:false
    },
    {
        Header:"Actions",
        sortable:false,
        filterable:false,
    }

]

export default Columns;