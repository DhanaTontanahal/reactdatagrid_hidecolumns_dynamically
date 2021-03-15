const initialData={
    tasks:{
        "task-1":{id:"task-1" , content:"content-1"},
        "task-2":{id:"task-2" , content:"content-2"},
        "task-3":{id:"task-3" , content:"content-3"},
        "task-4":{id:"task-4" , content:"content-4"}
    },
    columns:{
        "column-1":{
            id:"column-1",
            title:"to-do",
            taskIds:["task-1","task-2","task-3","task-4"],
        },
    },
    columnOrder:["column-1"],

};


export default initialData;