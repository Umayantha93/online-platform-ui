import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Wrapper = (props: any) => {
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get('user');
          if (data.role.id !== 2) { 
            setNavigate(true);
          }
        } catch (e) {
          setNavigate(true);
        }
      }
    )();
  }, []);

  if (navigate) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Wrapper;
