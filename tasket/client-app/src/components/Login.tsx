import { ErrorMessage,  Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../app/api/api';
import TextInputGeneral from '../app/common/TextInputGeneral';
import { UserInfo } from '../app/models/Account';



interface Props {
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}


const Login = (
    {setUserInfo}: Props
    ) => 
{
    
    const navigate = useNavigate();
    
    return (
        <>

        <Formik
            initialValues={{email:'', password: '', error: null}}
            onSubmit={async (values, {setErrors}) => {
                const content = await api.Account.login(values).catch(error => 
                    setErrors({error:'Invalid email or password'}));
                    if(content){
                        window.localStorage.setItem('tasket_jwt_token', content.token);
                        setUserInfo(content);
                        navigate(`/task`);
                    }
                }
            }
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) =>(
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Login</h3>
                        <TextInputGeneral name='email' placeholder="Email" />
                        <TextInputGeneral name='password' placeholder="Password" type="password" />
                        <ErrorMessage 
                            name='error' render={() => 
                                <Form.Label style = {{marginBottom:10}} basic color='red' >{errors.error}</Form.Label>
                        }
                        />
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className="btn btn-primary">Login</button>
                    </Form>
                )}
            </Formik>
        </>
    );

}

export default Login;
