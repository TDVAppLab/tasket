import { Col, Row } from "react-bootstrap"
import { TaskEdit } from "./TaskEdit"
import { TaskList } from "./TaskList"


export const TaskOperationMain = () => {
    
    

    return (
        <div>
            <Row>
                <Col>
                    <TaskList />
                </Col>
                <Col>
                    <TaskEdit id_task="dammy" />
                </Col>
            </Row>
        </div>
    )
}