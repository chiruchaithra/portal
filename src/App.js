import './App.css';
import {useState,useEffect} from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import _ from 'lodash';
import {v4} from 'uuid'
import NewTask from './Components/NewTask'
import ReactTooltip from "react-tooltip";


function App() {
    const [createTask,setCreateTask] = useState(false)
    const [objKey,setObjKey] = useState('')
    const [state,setState] = useState({})

    useEffect(() => {getFetchList()},[])

    const handleDragEnd = (data) => {
        const {destination,source} = data
        if(!destination || destination.droppableId === source.droppableId && destination.index === source.index) {return;}
        else {
            let comment;
            if(destination.droppableId === 'done') comment = window.prompt("Enter Comment")
            let itemSourceCopy = {...state[source.droppableId].items[source.index], comment: destination.droppableId === 'done' ? comment || 'This task has been completed' : '' }
            let itemDestinationCopy = {...state[destination.droppableId].items[destination.index]}
            setState((prev) => {
                prev={...prev}
                //Remove items from array
                prev[source.droppableId].items.splice(source.index,1)

                //add to particular column like(todo,inprogress,done)
                prev[destination.droppableId].items.splice(destination.index,0,itemSourceCopy)
                return prev
            })
        }
    }

    const reverseObj = (obj) => {
        let newObj = {}
        Object.keys(obj).sort().reverse().forEach((key) => {newObj[key] = obj[key]});
        return newObj
    }


    const getFetchList = async () => {
        const list = await fetch('https://todo-list-c67a5-default-rtdb.firebaseio.com/taskList.json',{method:'GET',})
        const res= await list.json()
        setObjKey(Object.keys(res)[0])
        if(Object.values(res).length) {
            const list = reverseObj(Object.values(res)[0])
            setState(list)
        }
    }

    const onAddClick = (text) => {
        if(text.trim().length) {
            setState((prev) => {
                return {
                    ...prev,
                    todo: { title:'Not Started',
                        items: [{id:v4(), name:text},
                            ...prev.todo.items,]
                    }}})
        }
        setCreateTask(false)
    }
    return (
        <div className="App">
            {createTask  ?  (<NewTask onAddButtonClick={(value) => {onAddClick(value)}} onCancelClick={() => {setCreateTask(false)}}/>) : (
                <>
                    <div className="creatTaskWrapper"><button className="newTask" onClick={() => {setCreateTask(true)}}> New Task </button></div>
                    <div className={'dragContextWrapper'}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            {Object.keys(state).length ?  _.map(state,(data,key) => {
                                return (
                                    <div  key={key} className={"column"}>
                                        <h3>{data?.title}</h3>
                                        <Droppable droppableId={key}>
                                            {(provided) => {
                                                return (
                                                    <div ref={provided?.innerRef}{...provided.droppableProps} className={'droppable-col'}>
                                                        {data?.items?.map((el,index) => {
                                                            return (
                                                                <Draggable key={el.id} index={index} draggableId={el.id}>
                                                                    {(provided,snapshot) => {
                                                                        return (
                                                                            <div
                                                                                className={` item ${snapshot.isDragging && 'dragging'}`} ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                                                                                {key === 'done' ? <div data-tip data-for={el.id}>{el.name}
                                                                                    <ReactTooltip place="bottom" id={el.id} type="success" backgroundColor="black"><span>{el.comment || 'This Task is completed'}</span></ReactTooltip>
                                                                                </div> :  el.name}
                                                                            </div>
                                                                        )
                                                                    }}
                                                                </Draggable>
                                                            )
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                )

                                            }}
                                        </Droppable>

                                    </div>
                                )
                            }) : <div class="loader"></div>}
                        </DragDropContext>
                    </div>
                </>)}
        </div>
    );
}

export default App;
