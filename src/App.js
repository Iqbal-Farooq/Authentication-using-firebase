import { Switch, Route,Redirect} from 'react-router-dom';
import { Context } from './Context/Context';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const ctx=useContext(Context)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!ctx.isLoggedIn  &&    <Route path='/auth'>
          <AuthPage />
        </Route>}

        <Route path='/profile'>
      
      {ctx.isLoggedIn &&    <UserProfile />}
      {!ctx.isLoggedIn && <Redirect to='/auth' />}
        
        </Route> 

        <Route  path='*'>
          <Redirect to='/' />
        </Route> 
      </Switch>
    </Layout>
  );
}

export default App;
