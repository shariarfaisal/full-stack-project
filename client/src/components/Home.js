import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from './history';
import Header from './Header';
import LeftSide from './left_side';
import RightSide from './right_side';
import Status from './Status';
class Home extends React.Component {
  render () {
    return(
      <React.Fragment>
        <Header history={this.props.history}/>
        <div id="home" className="text-light row">
          <LeftSide />
          <div className="col-12 col-md-6">
            <Status />
          </div>
          <RightSide />
        </div>
      </React.Fragment>
    )
  }
}




const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Home);
