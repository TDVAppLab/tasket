import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import api from './app/api/api';
import { UserInfo } from './app/models/Account';
import Login from './components/Login';
import Register  from './components/Register';
import { TaskOperationMain } from './components/TaskOperationMain';
import { NavBar } from './NavBar';

function App() {

  
  const [userInfo, setUserInfo] = useState<UserInfo>({username: '',email: '',token: ''});
  
  useEffect(() => {
    const token = window.localStorage.getItem('tasket_jwt_token');
    try{
      api.Account.current().then(user => {
        window.localStorage.setItem('tasket_jwt_token', user.token);
        setUserInfo(user);
      });
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  
  return (
    <>
      <NavBar userInfo={userInfo} setUserInfo={setUserInfo} />
      {userInfo.username==='' && 
        <>
          <Login setUserInfo={setUserInfo}/>
          <Register /> 
        </>
      }      
      <Routes>
        <Route path="/" element={<TaskOperationMain />} />
        <Route path = '/taskedit' element={<TaskOperationMain />} />
        <Route path = '/taskedit/:id' element={<TaskOperationMain />} />
        <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
      </Routes>
     </>
  );
}
export default App;