import { useState,useRef } from 'react';
import { useContext } from 'react';
import {Context} from '../../Context/Context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const ctx=useContext(Context)
  const [isLogin, setIsLogin] = useState(true);
  const [loading,Setloading]=useState(false);
  const emailInput=useRef();
  const passwordInput=useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    const enteredEmail=emailInput.current.value;
    const enteredPassword=passwordInput.current.value;

   
  let url;
    if(isLogin){ 
      Setloading(true)
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJplznXeTsFmGPjrJiYpE3mapkzAYlPzA'

      
    }else{
       Setloading(true)
       url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJplznXeTsFmGPjrJiYpE3mapkzAYlPzA'}

          fetch(url,{
        method:"POST",
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true,
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res=>{
         Setloading(false);
        if(res.ok){
          
          return res.json()
       
}
        else{
        
          return res.json().then(data=>{
           alert(data.error.message)
          })
        }
      }).then((data)=>{ 
        console.log(data.idToken)
        ctx.login(data.idToken);
      }).catch((err)=>console.log('Error',err.message))
    }
    
      
    


   

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInput}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
           {loading && <p>LOADING PLZ wait...</p>}
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
         
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
