import React, { Component } from 'react'
import Wrapper from '../components/admin/Wrapper'

export class Dashboard extends Component {
  render() {
    return (
    <Wrapper>
            <div className="col-md-10">
              <div className="card">
                <div className="card-header card-header-light">
                  <h3 className="card-title">Dashboard</h3>
                </div>
                <div className="card-body ">
                  <h4>Welcome to Dashboard</h4>
              </div>
            </div>
          </div>
    </Wrapper>
    )
  }
}

export default Dashboard