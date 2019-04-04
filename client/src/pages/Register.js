import React from 'react';
import {Link} from 'react-router-dom';
class Register extends React.Component{
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    let {name,email,password,confirmPassword,error} = this.state;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center my-5">Register New Account </h1>
          <form onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name "
                  id="name"
                  value={name}
                  onChange={this.changeHandler}
                />
              </div>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter your password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.changeHandler}
                />
              </div>
              <Link to="/login">Already Have Account? Login Account</Link>
              <button className="btn btn-primary d-block my-3">Signup</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Register;
