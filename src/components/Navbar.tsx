import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User } from '../models/user';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(new User(0,'','','',0));

  useEffect( () => {
    (
      async () => {
        const {data} = await axios.get('user');

        setUser(new User(
          data.id,
          data.first_name,
          data.last_name,
          data.email,
          data.role_id
        ));
      }
    )();
  }, []);

  const logout = async () => {
    await axios.post('logout', {})
}
  return (
    <div className="mb-3">
      <header className="navbar navbar-expand-md navbar-dark d-print-none">
        <div className="container-xl">
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            <div className="d-none d-md-flex">
            <Link className="nav-link" to="#">
                <span className="nav-link-title">{user.name}</span>
            </Link>
            <Link className="nav-link" to={'/login'}>
                <span className="nav-link-title" onClick={logout}>Sign out</span>
            </Link>
              <div className="nav-item dropdown d-none d-md-flex me-3">

              </div>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
              <ul className="navbar-nav">
                {user.role_id === 2 && (
                    <>
                      <li className="nav-item">
                        <NavLink 
                          to={'/admin/students'} 
                          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                          Students Manages
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink 
                          to={'/admin/courses'} 
                          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                          Courses Manages
                        </NavLink>
                      </li>
                    </>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
