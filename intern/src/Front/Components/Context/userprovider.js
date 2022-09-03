import React, {createContext, useState, useEffect} from 'react';


const UserContext = createContext({});

 const UserProvider = (props) => {
  const [auth, setAuth] = useState({});
  
  useEffect (()=>{
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setAuth(JSON.parse(window.localStorage.getItem({token,user})))
  },[])
  
    return (
    <UserContext.Provider value={{auth, setAuth}}>
        {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider};