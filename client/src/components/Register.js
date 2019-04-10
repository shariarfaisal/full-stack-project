import React from 'react'
import {connect} from 'react-redux';
import {register} from '../store/actions/authActions';
import {Link} from 'react-router-dom';


class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: {},
      name: '',
      email: '',
      password:'',
      userName: '',
      confirmPassword: ''
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

  componentDidMount = () => {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/');
    }
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  submitHandler = (e) => {
    let {name,email,userName,password,confirmPassword} = this.state;
    e.preventDefault();
    this.props.register({name,email,userName,password,confirmPassword},this.props.history)
  }


  render () {

    let {name,email,password,userName,confirmPassword,error} = this.state;
    return (
      <div className="row text-light">
      <div className="col-12 col-md-6" style={{margin:'auto'}}>
        <h1 className="text-center my-5">Create  New Account</h1>
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
                  <label htmlFor="userName">User Name</label>
                  <input
                    type="text"
                    className={error.userName? "form-control is-invalid" : "form-control"}
                    placeholder="Set your user name ... "
                    id="userName"
                    value={userName}
                    onChange={this.changeHandler}
                  />
                {error.userName && <div className="invalid-feedback">{error.userName}</div>}
                </div>
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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{register})(Register);
