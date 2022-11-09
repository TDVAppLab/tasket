import React from "react";
import { Navigate } from "react-router-dom";
import { UserInfo } from "../app/models/Account";

interface Props {
    userInfo: UserInfo;
    component: React.ReactNode;
    redirect: string
  }  
  
export const RouteAuthChk = ({userInfo, component, redirect}: Props) => {
    
  if (!userInfo.username) {
    return <Navigate to={redirect} replace={false} />
  }

  return <>{component}</>;

}