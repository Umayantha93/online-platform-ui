import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import UserWrapper from '../components/user/UserWrapper';

const CourseView = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (id) {
          const { data } = await axios.get(`/courses/${id}`);
          setTitle(data.data.title);
          setDescription(data.data.description);
          setImage(data.data.image);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    const checkEnrollmentStatus = async () => {
      try {
        if (id) {
          const { data } = await axios.get(`/enrollments/check/${id}`);
          setIsEnrolled(data.isEnrolled);
        }
      } catch (error) {
        console.error('Error checking enrollment status:', error);
      }
    };

    fetchCourseData();
    checkEnrollmentStatus();
  }, [id]);

  const handleEnrollClick = async () => {
    try {
      if (isEnrolled) {
        await axios.delete(`/enrollments/${id}`);
        setIsEnrolled(false);
      } else {
        await axios.post('/enrollments', { course_id: id });
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error('Error toggling enrollment status:', error);
    }
  };

  return (
    <UserWrapper>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards d-flex justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header card-header-dark d-flex justify-content-between">
                  <div className="d-flex justify-content-left mb-2 w-100">
                    <button
                      className={`btn ${isEnrolled ? 'btn-outline-light active' : 'btn-dark'} btn-square w-20`}
                      onClick={handleEnrollClick}
                    >
                      {isEnrolled ? 'Remove from enrolling' : 'Enroll this course'}
                    </button>
                  </div>
                  <div className="mb-2 ms-auto">
                    <span className="avatar me-3 rounded" style={{ backgroundImage: `url(${image})` }}></span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center mb-2">
                    <img src={image} alt={title} className="img-fluid" width={300} />
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <h1>{title}</h1>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserWrapper>
  );
};

export default CourseView;
