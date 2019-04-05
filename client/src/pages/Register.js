import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../store/actions/authActions';
class Register extends React.Component{
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: {}
  }

  static getDerivedStateFromProps(nextProps,prevState){
    if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)){
      return {
        error: nextProps.auth.error
      }
    }
    return null
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  submitHandler = e =>{
    e.preventDefault();
    let {name,email,password,confirmPassword} = this.state;
    this.props.register({name,email,password,confirmPassword},this.props.history);
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
                  className={error.name? "form-control is-invalid" : "form-control"}
                  placeholder="Enter your name "
                  id="name"
                  value={name}
                  onChange={this.changeHandler}
                />
              {error.name && <div className="invalid-feedback">{error.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={error.email || error.message? "form-control is-invalid" : "form-control"}
                  placeholder="Enter your email "
                  id="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              {error.email && <div className="invalid-feedback">{error.email}</div>}
              {error.message && <div className="invalid-feedback">{error.message}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={error.password? "form-control is-invalid" : "form-control"}
                  placeholder="Enter your Password "
                  id="password"
                  value={password}
                  onChange={this.changeHandler}
                />
                {error.password && <div className="invalid-feedback">{error.password}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={error.confirmPassword? "form-control is-invalid" : "form-control"}
                  placeholder="Re-enter your password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.changeHandler}
                />
              {error.confirmPassword && <div className="invalid-feedback">{error.confirmPassword}</div>}
              </div>
              <Link to="/login">Already Have Account? Login Account</Link>
              <button className="btn btn-primary d-block my-3">Signup</button>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps,{register})(Register);
