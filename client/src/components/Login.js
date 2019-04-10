
import React from 'react'
import {connect} from 'react-redux';
import {login} from '../store/actions/authActions';
import {Link} from 'react-router-dom';
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: {},
      email: '',
      password:''
    }
  }

  static getDerivedStateFromProps = (nextProps,prevProps) => {
    if(nextProps.auth.error !== prevProps.error){
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

  componentDidMount = () => {
    if(this.props.auth.isAuthenticated){
      this.props.history.push(`/${this.props.auth.user.userName}`);
    }
  }

  submitHandler = (e) => {
    let {email,password} = this.state;
    e.preventDefault();
    this.props.login({email,password},this.props.history);
  }
  render () {
    let {email,password,error} = this.state;
    return (
      <div className="row text-light">
        <div className="col-12 col-md-6" style={{margin:'auto'}}>
          <h1 className="text-center  my-5">Create  New Account</h1>
          <form onSubmit={this.submitHandler}>
            {error.message && <h5 className="text-center text-danger my-3">{error.message}</h5>}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={error.loginEmail? "form-control is-invalid" : "form-control"}
                      placeholder="Enter your email "
                      id="email"
                      value={email}
                      onChange={this.changeHandler}
                    />
                  {error.loginEmail && <div className="invalid-feedback">{error.loginEmail}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={error.loginPassword? "form-control is-invalid" : "form-control"}
                      placeholder="Enter your Password "
                      id="password"
                      value={password}
                      onChange={this.changeHandler}
                    />
                    {error.loginPassword && <div className="invalid-feedback">{error.loginPassword}</div>}
                  </div>
                  <Link to="/register"> Haven't Account? Register Account</Link>
                  <button type="submit" className="btn btn-primary d-block my-3">Login</button>
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
