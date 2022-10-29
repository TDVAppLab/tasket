import { useEffect, useState } from "react";

interface Task {
    id_task: string;
    title: string;
    is_finish: boolean;
    description: string;
    end_date_scheduled: Date;
    end_date_actual: Date;
  }


interface Props {
    id_task: string
}


export const TaskEdit = ({id_task}: Props) => {    
    
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        id_task !== "" && loadTaskDetails();
    }, [id_task]);
  
    const loadTaskDetails = async () => {
        const response = await fetch(`https://localhost:5001/task/${id_task}`);
        const data = await response.json();
        setTask(data);
    };

    return (
        <div>
            <h3>Task Detail : {task && task.title}</h3>
            { task &&
            <div>
                <input type="checkbox" defaultChecked={task.is_finish} disabled />
                <label>Finished</label>

                <br />

                <label>Description</label>
                <p>{task.description}</p>

                <label>Due date</label>
                <p>{task.end_date_scheduled && (new Date(task.end_date_scheduled).toDateString())}</p>

                <label>Completion Date</label>
                <p>{task.end_date_actual && (new Date(task.end_date_actual).toDateString())}</p>

            </div>
            }
        </div>
    )
}