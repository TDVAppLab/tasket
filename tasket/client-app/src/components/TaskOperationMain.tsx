import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { TaskEdit } from "./TaskEdit"
import { TaskList } from "./TaskList"


export const TaskOperationMain = () => {
    
    const {id} = useParams<{id:string}>();
    
    useEffect(()=> {

        if(id) {
            setSelectedId_task(id);
        } else {
            setSelectedId_task("");
        }

    }, [id])
    
    const [isModeAddnew, setIsModeAddnew] = useState(false);
    const [selectedId_task, setSelectedId_task] = useState("");

    return (
        <div>
            
            <Button variant="primary" onClick={()=>{setIsModeAddnew(true); setSelectedId_task("")}}>Add New Task</Button>

            <Row>
                <Col>
                    <TaskList setIsModeAddnew={setIsModeAddnew} selectedId_task={selectedId_task} setSelectedId_task={setSelectedId_task}/>
                </Col>
                <Col>
                    {
                        (isModeAddnew || selectedId_task !== "") &&
                            <TaskEdit isModeAddnew={isModeAddnew} id_task={selectedId_task} setSelectedId_task={setSelectedId_task} />
                    }
                </Col>
            </Row>
        </div>
    )
}