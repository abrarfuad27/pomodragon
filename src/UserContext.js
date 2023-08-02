import React from "react";
import { createContext } from "react";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState('');
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}
