import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

// 컴포넌트를 사용하려면 import
import LandingPage from './components/views/LandingPage/LandingPage';    
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

// Auth HOC Component 에 component 들을 넣기 위해 import
import Auth from './hoc/auth';

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
          <Route exact path="/" component={Auth(LandingPage)} />  {/* HOC 컴포넌트 안에 컴포넌트를 넣기 위해 이렇게 처리 */}
          <Route exact path="/login" component={Auth(LoginPage)} />
          <Route exact path="/register" component={Auth(RegisterPage)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


