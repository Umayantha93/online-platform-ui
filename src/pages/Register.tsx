import React, { Component, SyntheticEvent } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Register extends Component {

  first_name = '';
  last_name = '';
  email = '';
  password = '';
  password_confirm = '';
  state = {
    navigate: false
  }

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('register', {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    });
    this.setState({
      navigate: true
    })
  }

  render() {
    
    if(this.state.navigate){
      return <Navigate to={'/login'}/>
    }

    return (
      <div className="page page-center">
        <div className="container container-tight py-4">
          <form className="card card-md" autoComplete="off" onSubmit={this.submit} noValidate>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create new account</h2>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    required
                    onChange={e => this.first_name = e.target.value }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    required
                    onChange={e => this.last_name = e.target.value }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    onChange={e => this.email = e.target.value }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group input-group-flat">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      autoComplete="off"
                      required
                      onChange={e => this.password = e.target.value }
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password Confirmation</label>
                  <div className="input-group input-group-flat">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password Confirm"
                      autoComplete="off"
                      required
                      onChange={e => this.password_confirm = e.target.value }
                    />
                  </div>
                </div>


            <div className="form-footer">
              <button type="submit" className="btn btn-primary btn-square w-100">Create new account</button>
            </div>
          </div>
        </form>
        <div className="text-center text-muted mt-3">
          Already have an account? <a href="login">Sign in</a>
        </div>
      </div>
    </div>
    )
  }
}
export default Register;