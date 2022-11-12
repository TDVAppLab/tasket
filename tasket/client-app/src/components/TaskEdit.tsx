import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from 'yup';
import CheckBoxGeneral from "../app/common/CheckBoxGeneral";
import DateInputGeneral from "../app/common/DateInputGeneral";
import TextAreaGeneral from "../app/common/TextAreaGeneral";
import TextInputGeneral from "../app/common/TextInputGeneral";
import {v4} from 'uuid';
import api from "../app/api/api";
import { Task } from "../app/models/Task";
import { useTaskContext } from "../app/store/TaskContext";





export const TaskEdit = () => {    
    
    const [task, setTask] = useState<Task>();
    
    const taskStore = useTaskContext();

    useEffect(() => {
        if(taskStore.selectedTask){
            loadTaskDetails();
        } else {
            setTask({id_task : "", title : "", is_finish: false, description:"", end_date_scheduled : null, end_date_actual : null})
        }
    }, [taskStore.selectedTask]);
  
    const loadTaskDetails = async () => {
        if(taskStore.selectedTask) {
            const data = await api.Tasks.details(taskStore.selectedTask.id_task);
            setTask(data);
        }
    };


    const updateTaskDetails = async (value : Task) => {

        if(value.id_task===""){
            const newTask = value;
            newTask.id_task=v4();
            const data = await api.Tasks.create(newTask);
            setTask(data);

        } else {
            const data = await api.Tasks.update(value);
            setTask(data);
        }
    };


    const deleteTask = async (value : Task) => {

        if(value.id_task!==""){
            const data = await api.Tasks.delete(value.id_task);
            taskStore.setSelectedTask(null);
        }
    };
    
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        is_finish: Yup.bool().required(),
        description: Yup.string().nullable(),
        end_date_scheduled: Yup.date().nullable(),
        end_date_actual: Yup.date().nullable(),
    });
    
    const validationSchemaDel = Yup.object({
        id_task: Yup.string().required(),
    });



    return (
        <div>
            {
                taskStore.isModeAddnew ?
                    <h3>Add New Task</h3>
                    :
                    <h3>Task Detail : {task?.title}</h3>
            }
            { task &&
            <div>
                <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={task} 
                onSubmit={values => updateTaskDetails(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row className="my-4">
                            <Col><TextInputGeneral label='Title' name='title' placeholder='Title' /></Col>
                        </Row>

                        
                        <Row className="my-4">
                            <Col ><TextAreaGeneral label='Description' placeholder='Description' name='description' rows={3}   /></Col>
                        </Row>
                        
                        <Row className="my-4">
                            <Col ><DateInputGeneral title="Due Date" placeholderText='Due Date' name = 'end_date_scheduled' dateFormat='MM d, yyyy' /></Col>
                            <Col ><DateInputGeneral title="Completion Date" placeholderText='Completion Date' name = 'end_date_actual' dateFormat='MM d, yyyy' /></Col>
                        </Row>


                        
                        <Row className="my-4">
                            <Col xs={4}><CheckBoxGeneral label='Finished' name='is_finish'  /></Col>
                        </Row>
                        
                        <hr />
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary float-end'>
                            {isSubmitting ? "Processing" : "submit"}
                        </button>
                    </Form>
                )}

                </Formik>
                {
                !taskStore.isModeAddnew &&
                <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={task} 
                onSubmit={values => deleteTask(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>                        
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger float-end'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
                </Formik>
                }
            </div>

            }
        </div>

        

    )
}