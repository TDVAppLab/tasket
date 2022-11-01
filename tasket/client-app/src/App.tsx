import './App.css';
import Login from './components/Login';
import Register  from './components/Register';
import { TaskOperationMain } from './components/TaskOperationMain';

function App() {
  return (
    <div>
      <Login />
      <Register />
      <TaskOperationMain />
     </div>
  );
}
export default App;