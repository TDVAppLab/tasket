import { useEffect, useState } from 'react';
import './App.css';
import api from './app/api/api';
import { UserInfo } from './app/models/Account';
import Login from './components/Login';
import Register  from './components/Register';
import { TaskOperationMain } from './components/TaskOperationMain';

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
    <div>
      {userInfo.username==='' ? 
      <>
        <Login setUserInfo={setUserInfo}/>
        <Register /> 
      </>
      :
      <TaskOperationMain />
  }
      
     </div>
  );
}
export default App;