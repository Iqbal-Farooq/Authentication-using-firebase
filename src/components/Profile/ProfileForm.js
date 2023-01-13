import classes from './ProfileForm.module.css';
import { useState } from 'react';
import { Context } from '../../Context/Context';
import { useContext } from 'react';

const ProfileForm = () => {
  const [password,setpassword]=useState();
  const ctx=useContext(Context)

  const PasswordHandler=(e)=>{
    
    setpassword(e.target.value)
  }

  const updatePossword=(e)=>{
    e.preventDefault();
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJplznXeTsFmGPjrJiYpE3mapkzAYlPzA',
     { method:'POST',
    body:JSON.stringify({
      idToken:ctx.token ,
      password:password,
      returnSecureToken: true ,

    }),
    headers :{
      'Content-type':'application/json'
    }


  }).then(res=>{
        
        if(res.ok){
          
          return res.json()
       
}
        else{
        
          return res.json().then(data=>{
           alert(data.error.message)
          })
        }
      }).then((data)=>{ 
        console.log(data)
       
      }).catch((err)=>console.log('Error',err.message))
    }



  
  

 
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' onChange={PasswordHandler} />
      </div>
      <div className={classes.action}>
        <button onClick={updatePossword}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
