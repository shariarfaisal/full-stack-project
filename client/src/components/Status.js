import React from 'react'
import PropTypes from 'prop-types'

class Status extends React.Component {
  render () {
    return(
      <div id="status" className="row text-light mt-3">
        <div className="col-12">
          <div className="card bg-dark">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <textarea className="form-control bg-dark text-light" placeholder="What's on your mind?" id="post" cols="30" rows="5"></textarea>
                </div>
                <button className="btn btn-info btn-sm">send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Status;
