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
        <div className="mx-5">
            

            <Row>
                <Col className="m-2 my-3 p-4 bg-white rounded shadow-sm">
                    <h3 id="tabelLabel">Task List</h3>
                    <Button className="shadow-sm float-end" variant="primary" onClick={()=>{setIsModeAddnew(true); setSelectedId_task("")}}>Add New Task</Button>
                    <TaskList setIsModeAddnew={setIsModeAddnew} selectedId_task={selectedId_task} setSelectedId_task={setSelectedId_task}/>
                </Col>
                <Col className="m-2 my-3 p-4 bg-white rounded shadow-sm">
                    {
                        (isModeAddnew || selectedId_task !== "") &&
                            <TaskEdit isModeAddnew={isModeAddnew} id_task={selectedId_task} setSelectedId_task={setSelectedId_task} />
                    }
                </Col>
            </Row>
        </div>
    )
}