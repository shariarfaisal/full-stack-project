import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../store/actions/authActions';
import {Link} from 'react-router-dom';
import {userInfo} from '../store/actions/userProfileActions';
class Header extends React.Component {
  state={
    users: []
  }

  static getDerivedStateFromProps = (nextProps,prevProps) => {
    if(nextProps.users !== prevProps.users){
      return {
        users: nextProps.users
      }
    }
    return null;
  }

  componentDidMount =()=>{
    this.props.userInfo();
  }


  render () {
    return(
      <div id="header" className="text-light">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to={`/${this.props.auth.user.userName}`}>
          <img src="img/logo.jpg" className="img-fluid rounded-circle" alt="image" />
        </Link>
        <div className="">
          <p className="p-0 m-0">{this.props.auth.user.name}</p>
          <small style={{fontSize:'13px'}}>{`@${this.props.auth.user.userName}`}</small>
        </div>
        <Search />
        <div id="page-nav" className="ml-auto d-none d-sm-block">
          <ul className="navbar-nav mt-2">
            <li className="nav-item"><Link to="home" className="nav-link ls active">Home</Link></li>
            <li className="nav-item dropdown">
              <Link to="/friend" className="nav-link ls dropdown-toggle" data-toggle="dropdown"><i title="friends" className="fas fa-user-friends"></i></Link>
                <div className="dropdown-menu">
                  {this.state.users.map((i,index) => {
                    return <DropdownItem key={index} {...i} />
                  })}
                </div>
            </li>
            <li className="nav-item"><Link to="/notifications" className="nav-link ls"><i title="notifications" className="fas fa-bell"></i></Link></li>
            <li className="nav-item dropdown">
              <Link to="contact" className="nav-link ls dropdown-toggle" data-toggle="dropdown"></Link>
              <div className="dropdown-menu bg-dark text-light mr-5">
                <button onClick={() => this.props.logout(this.props.history)} className="logout dropdown-item">logout</button>
                <Link  to="/settings" className="dropdown-item">settings</Link>
              </div>
            </li>
          </ul>
        </div>
          <div className="social-logo my-1 my-lg-0 right ml-5" style={{display: 'inline-block'}}>
              <span className="mx-2"><Link className=" text-light" to="https://www.facebook.com/xfa1sal"><i className="fab fa-facebook-f"></i></Link></span>
              <span className="mx-2"><Link className=" text-light" to="https://twitter.com/x_fa1sal"><i className="fab fa-twitter"></i></Link></span>
              <span className="mx-2"><Link className=" text-light" to="https://github.com/shariarfaisal"><i className="fab fa-github"></i></Link></span>
              <span className="mx-2"><Link className=" text-light" to="https://www.linkedin.com/in/shariar-faisal-337815153/"><i className="fab fa-linkedin-in"></i></Link></span>
          </div>
      </nav>
    </div>
    )
  }
}

const Search = () => {
  return(
    <div className="input-group mx-auto" style={{width: '350px'}}>
      <input
        type="text"
        placeholder="Search"
        id="search"
        className="form-control from-control-sm"
      />
    <div className="input-group-append">
        <button type="submit" className="btn" name="button">Search</button>
      </div>
    </div>
  )
}

const DropdownItem = ({name,email,userName}) => {

  return (
    <div className="dropdown-item">
      <Link to={`/${userName}`}><p>{name}</p></Link>
      <small>{email}</small>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

export default connect(mapStateToProps,{logout,userInfo})(Header);
