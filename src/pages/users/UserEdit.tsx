import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/admin/Wrapper';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

export const UserEdit = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [navigate, setNavigate] = useState(false);
    
    const { id } = useParams();

    useEffect(() => {
        (
            async () => {
                try {
                    if (id) {
                        const { data } = await axios.get(`/users/${id}`);
                        setFirstName(data.data.first_name);
                        setLastName(data.data.last_name);
                        setEmail(data.data.email);
                        console.log(data.data.first_name)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        )();
    }, [id]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put(`/users/${id}`, {
                first_name,
                last_name,
                email,
            });
            setNavigate(true);
        } catch (error) {
            console.error('Error updating user:', error);
        }
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
                            defaultValue={first_name} 
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
                            defaultValue={last_name} 
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
                            defaultValue={email} 
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
    );
}
