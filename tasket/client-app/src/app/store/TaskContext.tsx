import React from "react";
import { Task } from "../models/Task";

export type TaskContextType = {
  selectedTask: Task | null;
  setSelectedTask: (task:Task | null) => void;
  isModeAddnew:boolean;
  setIsModeAddnew: (isModeAddnew:boolean) => void;
}
const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);

export const useTaskContext = ():TaskContextType => {
  return React.useContext<TaskContextType>(TaskContext);
}

type Props = {
  children: React.ReactNode
}

export const TaskProvider = (props:Props) => {
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [isModeAddnew, setIsModeAddnew] = React.useState(false);


  const value:TaskContextType = { selectedTask, setSelectedTask, isModeAddnew, setIsModeAddnew };
  
  return (
    <TaskContext.Provider value={value}>
      {props.children}
    </TaskContext.Provider>
  );
}