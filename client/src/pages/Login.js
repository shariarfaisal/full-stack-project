import React from 'react';
import {Link} from 'react-router-dom';
class Login extends React.Component{
  state = {
    email: '',
    password: '',
    error: {}
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  submitHandler = e =>{
    e.preventDefault();
    console.log(this.state);
  }
  render(){
    let {email,password,error} = this.state;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center my-5">Login into your account</h1>
          <form onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email "
                  id="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your Password "
                  id="password"
                  value={password}
                  onChange={this.changeHandler}
                />
              </div>
              <Link to="/register">Don't Have Account? Register Account</Link>
              <button className="btn btn-primary d-block my-3">Login</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login;
