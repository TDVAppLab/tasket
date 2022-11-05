import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import api from './app/api/api';
import { UserInfo } from './app/models/Account';
import Login from './components/Login';
import Register  from './components/Register';
import { RouteAuthChk } from './components/RouteAuthChk';
import { TaskOperationMain } from './components/TaskOperationMain';
import { NavBar } from './NavBar';

function App() {

  
  const [userInfo, setUserInfo] = useState<UserInfo>({username: '',email: '',token: ''});
  const [isFirstLoginChecked, setIsFirstLoginChecked] = useState(false);
  
  useEffect(() => {
    const token = window.localStorage.getItem('tasket_jwt_token');
    try{
      api.Account.current().then(user => {
        window.localStorage.setItem('tasket_jwt_token', user.token);
        setUserInfo(user);
        setIsFirstLoginChecked(true);
      }).catch(x=>setIsFirstLoginChecked(true))
      
    } catch (error) {
      
      console.log(error);
    }
  }, []);

  if(!isFirstLoginChecked) { return (<div>loading</div>) }

  
  return (
    <>
      <NavBar userInfo={userInfo} setUserInfo={setUserInfo} />
      <Routes>
        <Route path = '/' element={ <RouteAuthChk userInfo={userInfo} component={<TaskOperationMain />} redirect="/login" /> } />
        <Route path = '/task' element={ <RouteAuthChk userInfo={userInfo} component={<TaskOperationMain />} redirect="/login" /> } />
        <Route path = '/task/:id' element={ <RouteAuthChk userInfo={userInfo} component={<TaskOperationMain />} redirect="/login" /> } />
        <Route path = '/taskcreate' element={ <RouteAuthChk userInfo={userInfo} component={<TaskOperationMain />} redirect="/login" /> } />
        <Route path = '/login' element={<Login setUserInfo={setUserInfo} />} />
        <Route path = '/register' element={<Register />} />
      </Routes>
     </>
  );
}
export default App;