import './NewTask.css'
import {useState} from "react";
const NewTask = ({onAddButtonClick,onCancelClick}) => {
    const [taskName,setTaskName] = useState('')
    return (
        <div className="newTaskWrapper">
            <div className="wrapper">
                <div className="content">
                    <h1>Create task</h1>
                    <div className="flex">
                        <div>Enter Task name</div>
                        <input className="input"  type="text" value={taskName} onChange={(e) => {setTaskName(e.target.value)}}/>
                    </div>
                    <div className="flex">
                        <lable>Assign To</lable>
                        <select>
                            <option>Select</option>
                            <option selected={true}>Assign to yourself</option>
                        </select>
                    </div>
                </div>
                <div className="buttonWrapper">
                    <button className="button" onClick={() => {onAddButtonClick(taskName);setTaskName('')}} >Add Task</button>
                    <button className="button cancelButton" onClick={onCancelClick}>Cancel</button>
                </div>
            </div>
        </div>
)

}
export default NewTask;