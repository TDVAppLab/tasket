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



interface Props {
    isModeAddnew: boolean;
    id_task: string;
    setSelectedId_task: React.Dispatch<React.SetStateAction<string>>;
}

export const TaskEdit = ({isModeAddnew, id_task, setSelectedId_task}: Props) => {    
    
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        if(id_task !== ""){
            loadTaskDetails();
        } else {
            setTask({id_task : "", title : "", is_finish: false, description:"", end_date_scheduled : null, end_date_actual : null})
        }
    }, [id_task]);
  
    const loadTaskDetails = async () => {
        const data = await api.Tasks.details(id_task);
        setTask(data);
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
            setSelectedId_task("");
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
                isModeAddnew ?
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

                        <Row>
                            <Col><TextInputGeneral label='Title' name='title' placeholder='Title' /></Col>
                        </Row>

                        <hr />
                        
                        <Row>
                            <Col ><TextAreaGeneral label='Description' placeholder='Description' name='description' rows={3}   /></Col>
                        </Row>
                        
                        <Row>
                            <Col ><DateInputGeneral placeholderText='Due Date' name = 'end_date_scheduled' dateFormat='MM d, yyyy' /></Col>
                            <Col ><DateInputGeneral placeholderText='Completion Date' name = 'end_date_actual' dateFormat='MM d, yyyy' /></Col>
                        </Row>


                        
                        <Row>
                            <Col xs={4}><CheckBoxGeneral label='Finished' name='is_finish'  /></Col>
                        </Row>
                        
                        <hr />
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "submit"}
                        </button>
                    </Form>
                )}

                </Formik>
                {
                !isModeAddnew &&
                <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={task} 
                onSubmit={values => deleteTask(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>                        
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>
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