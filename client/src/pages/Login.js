import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../store/actions/authActions';
class Login extends React.Component{
  state = {
    email: '',
    password: '',
    error: {}
  }

  static getDerivedStateFromProps = (nextProps,prevProps) =>{
    if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevProps.error)){
      return {
        error: nextProps.auth.error
      }
    }
    return null;
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  submitHandler = e =>{
    let {email,password} = this.state;
    e.preventDefault();
    this.props.login({email,password},this.props.history);
  }
  render(){
    let {email,password,error} = this.state;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center my-5">Login into your account</h1>
          <form onSubmit={this.submitHandler}>
            {error.message && <h4 className="text-center text-danger">{error.message}</h4>}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={error.email? "form-control is-invalid" : "form-control"}
                  placeholder="Enter your email "
                  id="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              {error.email && <div className="invalid-feedback">{error.email}</div>}
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
              <Link to="/register">Don't Have Account? Register Account</Link>
              <button className="btn btn-primary d-block my-3">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

  const mapStateToProps = (state) => ({
    auth: state.auth
  })

export default connect(mapStateToProps,{login})(Login);
