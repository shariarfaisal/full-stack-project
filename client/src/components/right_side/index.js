import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {userInfo} from '../../store/actions/userProfileActions';

class RightSide extends React.Component {
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
      <div className="col-12 col-md-3">
        <h4 className="text-center my-3">Add to another people</h4>
        <div className="row">
          {
            this.state.users.map(i => {
              return this.props.auth.user._id !== i._id ?
                <AddFreind {...i} /> : ''
            })
          }
        </div>
      </div>
    )
  }
}
// <Link to={`/${userName}`}><p>{name}</p></Link>
const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

const AddFreind = ({name,userName}) => {
  return (
    <div className=" col-8 col-md-5 m-2  card bg-dark text-light p-2">
        <Link to={`/${userName}`}><p>{name}</p></Link>
        <button className="btn btn-sm btn-info"><i title="Add to Requist" className="fas fa-user-friends"></i> Add Friend</button>
    </div>
  )
}

export default connect(mapStateToProps,{userInfo})(RightSide);
