import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { Context } from '../../Context/Context';
import { useContext } from 'react';

const MainNavigation = () => {
  const ctx=useContext(Context)
  const isLoggedIn= ctx.isLoggedIn;
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
         <li>
        { !isLoggedIn && <Link to='/auth'>Login</Link> }
         
            
          </li>
          <li>
          { isLoggedIn && <Link to='/profile'>Profile</Link> }  
          </li>
          <li>
          {isLoggedIn && <button>Logout</button> }  
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
