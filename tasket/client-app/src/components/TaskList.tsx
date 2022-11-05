import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../app/api/api';
import { Task } from '../app/models/Task';



interface Props {
  selectedId_task: string;
  setIsModeAddnew: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId_task: React.Dispatch<React.SetStateAction<string>>;
}


export const TaskList = ({setIsModeAddnew, selectedId_task, setSelectedId_task}: Props) => {
  
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>();
  
    useEffect(() => {
        populateWeatherData();
    }, []);
  
    const populateWeatherData = async () => {
        const data = await api.Tasks.index();
        setTasks(data);
        setLoading(false);
    };
    
    if(loading) return <div>loading....</div>

    return (
        <div>
            <h1 id="tabelLabel">Task List</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <Table >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Fin.</th>
                  <th>Title</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks && tasks.map((task, index) => (
                  <tr 
                    key={task.id_task} onClick={()=>{setIsModeAddnew(false); setSelectedId_task(task.id_task);
                      navigate(`/taskedit/${task.id_task}`);
                    }}  
                    className={ selectedId_task === task.id_task ? "table-info" :  ""}                  
                  >
                    <td>{index+1}</td>
                    <td><input type="checkbox" defaultChecked={task.is_finish} disabled /></td>
                    <td>{task.title}</td>
                    <td>{task.end_date_scheduled && (new Date(task.end_date_scheduled).toDateString())}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </div>
    )
}