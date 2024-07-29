import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [navigate, setNavigate] = useState({ shouldNavigate: false, to: '' });

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { data } = await axios.post('login', {
      email,
      password
    });
    
    if (data.role === 2) { 
      setNavigate({ shouldNavigate: true, to: '/admin/dashboard' });
    } else {
      setNavigate({ shouldNavigate: true, to: '/home' });
    }
  }

  if (navigate.shouldNavigate) {
    return <Navigate to={navigate.to} />
  }

  return (
    <div className="page page-center">
      <div className="container container-normal py-4">
        <div className="row align-items-center g-4">
          <div className="col-lg">
            <div className="container-tight">
              <div className="card card-md">
                <div className="card-body">
                  <h2 className="h2 text-center mb-4">Login to your account</h2>
                  <form onSubmit={submit}>

                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <input 
                          type="email" 
                          className="form-control" 
                          placeholder="your@email.com"
                          required
                          onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">
                        Password
                      </label>
                      <div className="input-group input-group-flat">
                        <input 
                          type="password" 
                          className="form-control"  
                          placeholder="Your password"  
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-footer">
                      <button type="submit" className="btn btn-primary btn-square w-100">Sign in</button>
                    </div>
                  </form>
                  <div className="text-center text-muted mt-3">
                    Don't have an account? <a href="register">Create an account</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
