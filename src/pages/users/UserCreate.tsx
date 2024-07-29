import React, { SyntheticEvent, useState } from 'react'
import Wrapper from '../../components/admin/Wrapper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


export const UserCreate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [navigate, setNavigate] = useState(false);



    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('users', {
            first_name,
            last_name,
            email,
        });
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to={'/admin/students'}/>;
    }

  return (
    <Wrapper>
            <div className="col-md-10">
              <div className="card">
                <div className="card-header card-header-light">
                  <h3 className="card-title">Create new student</h3>
                </div>
                <div className="card-body ">
                  <form className="col-8 mt-8" onSubmit={submit} autoComplete="off" noValidate>

                    <div className="mb-3">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                        onChange={e => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Last name</label>
                      <input 
                        type="text"
                        className="form-control" 
                        placeholder="Enter last name"
                        onChange={e => setLastName(e.target.value)} 
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input 
                        type="email"
                        className="form-control" 
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="form-footer col-4">
                      <button className="btn btn-primary btn-square w-100">Add new student</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
    </Wrapper>
  )
}
