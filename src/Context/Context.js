import React from 'react';
import { useState } from 'react';
export const Context=React.createContext({
    token :'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}

})



const ContextProvider=(props)=>{
    const intialToken=localStorage.getItem('token');
    const[TokenState,SetTokenState]=useState(intialToken);
    
    const userIsLogedIn=!!TokenState;
    // console.log("tokentate is : ",TokenState)


    const  loginHandler=(token)=>{
        localStorage.setItem('token',token);
         SetTokenState(token);

    }

    const logOutHandler=()=>{
        localStorage.removeItem('token');
        SetTokenState(null);

    }
    const ContextValue={

        token:TokenState,
        isLoggedIn:userIsLogedIn,
        login :loginHandler,
        logout:logOutHandler,
    }




   return( <Context.Provider value={ContextValue}>{props.children}</Context.Provider> )
  
    
}
export default ContextProvider;
