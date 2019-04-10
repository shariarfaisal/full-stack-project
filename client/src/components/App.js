import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from './history';
import Home from './Home';
class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <div id="app" className=" bg-dark text-light">
                <Route path="/" exact component={Home} />
                <Route path="/:userName" exact component={Profile} />
                <Route path="/user/register" exact component={Register} />
                <Route path="/user/login" exact component={Login} />
          </div>
        </Switch>
      </Router>
    )
  }
}



const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);
