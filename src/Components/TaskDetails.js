import axios from "axios";
import react,{useState} from "react";

const TaskDetails=()=>{

    const [resultantData, setResultantData]=useState([]);
    const [taskId,setTaskId]=useState("");
    const [taskHolderName,setTaskHolderName]=useState("");
    const [taskDate,setTaskDate]=useState("");
    const [taskName,setTaskName]=useState("");
    const [taskStatus,setTaskStatus]=useState("");

    const addDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'post',
            url: 'http://localhost:8000/saveTask',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                taskId:taskId,
                taskHolderName:taskHolderName,
                taskDate:taskDate,
                taskName:taskName,
                taskStatus:taskStatus
            })
        }).then((response)=>{
            const newData = response.data.map(object => ({
                taskId:object.taskId,
                taskHolderName:object.taskHolderName,
                taskDate:object.taskDate,
                taskName:object.taskName,
                taskStatus:object.taskStatus
            }));
            setResultantData(newData);
        });
    }

    const deleteDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/deleteTask?id=${taskId}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                taskId:object.taskId,
                taskHolderName:object.taskHolderName,
                taskDate:object.taskDate,
                taskName:object.taskName,
                taskStatus:object.taskStatus
            }));
            setResultantData(newData);
        });   
    }

    const showDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: 'http://localhost:8000/alltasks'
        }).then((response)=>{
            const newData = response.data.map(object => ({
                taskId:object.taskId,
                taskHolderName:object.taskHolderName,
                taskDate:object.taskDate,
                taskName:object.taskName,
                taskStatus:object.taskStatus
            }));
            setResultantData(newData);
        });  
    }

    const findDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/getTask?name=${taskHolderName}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                taskId:object.taskId,
                taskHolderName:object.taskHolderName,
                taskDate:object.taskDate,
                taskName:object.taskName,
                taskStatus:object.taskStatus
            }));
            setResultantData(newData);
        });  
    }

    const editDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/changeStatus?id=${taskId}&&status=${taskStatus}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                taskId:object.taskId,
                taskHolderName:object.taskHolderName,
                taskDate:object.taskDate,
                taskName:object.taskName,
                taskStatus:object.taskStatus
            }));
            setResultantData(newData);
        });  
    }

    return(
        <div>
            <center>
            <h1 className="heading">Task-Management</h1>
            <div className="formContainer">
                <input type="text" id="taskId" placeholder="Enter Task ID" onChange={(e)=>setTaskId(e.target.value)} /><br/>
                <input type="text" id="taskHolderName" placeholder="Enter Task Holder Name" onChange={(e)=>setTaskHolderName(e.target.value)} /><br/>
                <input type="text" id="taskDate" placeholder="Enter Task Date" onChange={(e)=>setTaskDate(e.target.value)} /><br/>
                <input type="text" id="taskName" placeholder="Enter Task Name" onChange={(e)=>setTaskName(e.target.value)}/><br/>
                <input type="text" id="taskStatus" placeholder="Enter Task Status" onChange={(e)=>setTaskStatus(e.target.value)}/><br/>
            </div>
            </center>
            <div className="actionContainer">
                <div>
                    <button onClick={()=>{addDetails()}} className="add-button">Save Task</button>
                </div>
                <div>
                    <button onClick={()=>{editDetails()}} className="find-type-button">Edit Task</button>
                </div>
                <div>
                    <button onClick={()=>{deleteDetails()}} className="delete-button">Delete Task</button>
                </div>
                <div>
                    <button onClick={()=>{showDetails()}} className="show-button">Show All</button>
                </div>
                <div>
                    <button onClick={()=>{findDetails()}} className="find-id-button">Find By Holdername</button>
                </div>  
            </div>
            <div id="result">
                <h2>Task Details</h2>
                <div className="detailsContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Task Id</th>
                                <th>Task Holder Name</th>
                                <th>Task Date</th>
                                <th>Task Name</th>
                                <th>Task Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultantData.map((data,index)=>{
                                return (
                                    <tr key={index.toString()}>
                                        <td>{data.taskId}</td>
                                        <td>{data.taskHolderName}</td>
                                        <td>{data.taskDate}</td>
                                        <td>{data.taskName}</td>
                                        <td>{data.taskStatus}</td>
                                    </tr>
                                ) 
                            })}
                        </tbody>    
                    </table>
                </div>
            </div>
            
        </div>
    )
}
export default TaskDetails;