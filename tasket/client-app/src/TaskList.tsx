import { useEffect, useState } from 'react';

interface Task {
  id_task: string;
  title: string;
  is_finish: boolean;
  end_date_scheduled: Date;
}

export const TaskList = () => {
    
    
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>();
  
    useEffect(() => {
        populateWeatherData();
    }, []);
  
    const populateWeatherData = async () => {
        const response = await fetch('https://localhost:5001/task');
        const data = await response.json();
        setTasks(data);
        setLoading(false);
    };
    
    if(loading) return <div>loading....</div>

    return (
        <div>
            <h1 id="tabelLabel">Task List</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <table className="table table-striped" aria-labelledby="tabelLabel">
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
                  <tr key={task.id_task}>
                    <td>{index+1}</td>
                    <td><input type="checkbox" defaultChecked={task.is_finish} disabled /></td>
                    <td>{task.title}</td>
                    <td>{task.end_date_scheduled && (new Date(task.end_date_scheduled).toDateString())}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    )
}