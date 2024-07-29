import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/admin/Wrapper';
import axios from 'axios';
import "../../dist/css/course.table.css";
import { Link } from 'react-router-dom';
import { Course } from '../../models/course';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  
  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`courses?page=${page}`);
      console.log(data.data);
      setCourses(data.data);
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
        await axios.delete(`courses/${id}`);

        setCourses(courses.filter((c: Course) => c.id !== id));
    }
  }

  return (
    <Wrapper>
    <div className="col-10">
      <div className="d-flex justify-content-end mb-2">
        <Link to={`/admin/courses/create`} className="btn btn-dark btn-square w-15">Create new Course</Link>
      </div>
    
      <div className="card">
        <div className="table-responsive">
          <table className="table table-vcenter card-table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th className="w-55">Description</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id}>
                    <td className="text-muted">{index}</td>
                    <td className="text-muted">{course.title}</td>
                    <td className="text-muted description" style={{width: '255px', height: '30px'}}>{course.description}</td>
                    <td>
                      <img src={course.image} alt={course.title} style={{ width: '65px', height: '50px' }} />
                    </td>
                    <td>
                      <Link to={`/admin/courses/${course.id}/edit`} className="btn btn-dark btn-square w-15">Edit</Link>
                      <button className="btn btn-danger btn-square w-10 ms-2"onClick={() => del(course.id)}>
                      Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
      
        </div>

      </div>
      <nav className="d-flex justify-content-end mt-3">
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

export default Courses;
