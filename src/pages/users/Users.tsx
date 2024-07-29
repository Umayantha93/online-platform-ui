import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/admin/Wrapper';
import axios from 'axios';
import { User } from '../../models/user';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  
  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`users?page=${page}`);
      setUsers(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const next = () => {
    if(page < lastPage){
      setPage(page + 1);
    }
  }

  const prev = () => {
    if(page >= 1){
      setPage(page - 1);
    }
  }

  const del = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this record?')){
        await axios.delete(`users/${id}`);

        setUsers(users.filter((u: User) => u.id !== id));
    }
  }

  return (
    <Wrapper>

    <div className="col-10">
    <div className="d-flex justify-content-end mb-2">
        <Link to={`/admin/students/create`} className="btn btn-dark btn-square w-15">Create new student</Link>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-vcenter card-table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th className="w-6">Action</th>
              </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="text-muted">{index}</td>
                    <td className="text-muted">{user.first_name} {user.last_name}</td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <Link to={`/admin/students/${user.id}/edit`} className="btn btn-dark btn-square w-25">Edit</Link>
                      <button className="btn btn-danger btn-square w-30 ms-2"onClick={() => del(user.id)}>
                      Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
      
        </div>

      </div>
      <nav className="d-flex justify-content-end">
        <ul className='pagination'>
          <li className='page-item'>
            <a href="#" className='page-link' onClick={prev}>Previous</a>
          </li>
          <li className='page-item'>
            <a href="#" className='page-link' onClick={next}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
    </Wrapper>
  );
};

export default Users;
