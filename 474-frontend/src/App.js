import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/Homepage'
import Users from './components/users/Users'
import Posts from './components/posts/Posts'
import Login from './components/login/Login';
import NotFound from './components/nav/NotFound';
import { UserProvider } from './contexts/UserContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoutes from './protected-routes/ProtectedRoutes';
import Signup from './components/login/Signup';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <UserProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <ProtectedRoutes 
                exact
                path='/users' 
                component={Users}
                template={"accessibleAfterLogin"}
              />
              <ProtectedRoutes 
                exact
                path='/posts' 
                component={Posts}
                template={"accessibleAfterLogin"}
              />
              <Route exact path='/*' component={NotFound} />
            </Switch>
          </Router>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
