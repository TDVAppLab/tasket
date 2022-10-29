import { useState } from "react";
import { Col, Row } from "react-bootstrap"
import { TaskEdit } from "./TaskEdit"
import { TaskList } from "./TaskList"


export const TaskOperationMain = () => {
    
    
    const [selectedId_task, setSelectedId_task] = useState("");

    return (
        <div>
            <Row>
                <Col>
                    <TaskList selectedId_task={selectedId_task} setSelectedId_task={setSelectedId_task}/>
                </Col>
                <Col>
                    <TaskEdit id_task={selectedId_task} />
                </Col>
            </Row>
        </div>
    )
}