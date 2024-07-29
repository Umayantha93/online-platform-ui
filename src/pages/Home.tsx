import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserWrapper from '../components/user/UserWrapper';
import { Course } from '../models/course';
import { Link } from 'react-router-dom';

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`courses?page=${page}`);
        setCourses(data.data);
        setLastPage(data.meta.last_page);
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching course data', error);
      }
    };

    fetchCourses();
  }, [page]);

  const nextPage = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <UserWrapper>
    <div className="page-body">
      <div className="container-xl">
        <div className="row row-cards">
        {courses.map((course, index) => (
          <div className="col-sm-6 col-lg-4">
            <div className="card card-sm">
              <Link to={`/course/${course.id}/view`} className="d-block">
                <img src={course.image} className="card-img-top" alt="Card" height={300}/>
              </Link>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <span className="avatar me-3 rounded" style={{ backgroundImage: `url(${course.image})` }}></span>
                  <div>
                    <div>
                      {course.title}
                      </div>
                    <div className="text-muted">
                      {/* {data.time} */}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                 ))}
        </div>
      </div>
      <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={prevPage} disabled={page === 1}>Previous</button>
            </li>
            <li className={`page-item ${page === lastPage ? 'disabled' : ''}`}>
              <button className="page-link" onClick={nextPage} disabled={page === lastPage}>Next</button>
            </li>
          </ul>
        </nav>
    </div>
    </UserWrapper>
  );
};

export default Home;
