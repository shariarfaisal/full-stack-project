import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import {userInfo} from '../store/actions/authActions';
import Header from './Header';
import LeftSide from './left_side';
import RightSide from './right_side';
import Status from './Status';
class Profile extends React.Component {

  state={
    anotherUser:{}
  }


  componentDidMount = () => {
    if(!this.props.auth.isAuthenticated){
      this.props.history.push('/user/login');
    }
    this.props.userInfo(this.props.match.params.userName);
  }

  static getDerivedStateFromProps = (nextProps,prevProps) => {
    if(nextProps.auth.anotherUser !== prevProps.anotherUser){
      return{
        anotherUser: nextProps.auth.anotherUser
      }
    }
    return null;
  }

  render () {
    console.log(this.state);
    return(
      <Fragment>
        <Header history={this.props.history}/>
        <div id="content" className="bg-dark p-0 m-0 mt-2 text-light row">
          <div className="row m-2 w-100">
            <div className="col-12">
              <h3 className="">{this.state.anotherUser.name}</h3>
              <p>@{this.state.anotherUser.userName}</p>
              <p>{this.state.anotherUser.email}</p>
            </div>
          </div>
          <div className="row m-0 p-0 w-100 my-5">
            <div className="col-12 col-md-8 mx-auto">
              <Status />
            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{userInfo})(Profile);
