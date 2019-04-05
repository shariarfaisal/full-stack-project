import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store/actions/authActions';
class Home extends React.Component {
  render () {
    return (
      <div>
        <h1 className="text-center my-5">This is home page</h1>
        {
          this.props.auth.isAuthenticated ?
          <button
            className="btn btn-danger"
            onClick={() => this.props.logout(this.props.history)}
          >
            Logout
          </button>
        : <Link to="/login" ><button className="btn btn-success">login</button></Link>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps,{logout})(Home);
