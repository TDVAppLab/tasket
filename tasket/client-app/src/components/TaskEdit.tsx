import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from 'yup';
import CheckBoxGeneral from "../app/common/CheckBoxGeneral";
import DateInputGeneral from "../app/common/DateInputGeneral";
import TextAreaGeneral from "../app/common/TextAreaGeneral";
import TextInputGeneral from "../app/common/TextInputGeneral";

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


    const updateTaskDetails = async (value : Task) => {
        const response = await fetch("https://localhost:5001/task/update", { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)  
        });
        const data = await response.json();
        setTask(data);
    };
    
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        is_finish: Yup.bool().required(),
        description: Yup.string().nullable(),
        end_date_scheduled: Yup.date().nullable(),
        end_date_actual: Yup.date().nullable(),
    });



    return (
        <div>
            <h3>Task Detail : {task && task.title}</h3>
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
                            <Col ><TextAreaGeneral label='Short Description' placeholder='Description' name='short_description' rows={3}   /></Col>
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

            </div>

            }
        </div>

        

    )
}