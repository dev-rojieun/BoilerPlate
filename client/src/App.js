import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// 컴포넌트를 사용하려면 import
import LandingPage from './components/views/LandingPage/LandingPage';    
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        {/* 여기에 NavBar 가 들어갈 것 */}

        <Switch>
          {/*  
          <Route exact path="/">
            <LadingPage />
          </Route>
          */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


