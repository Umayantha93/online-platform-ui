import React, { SyntheticEvent, useState } from 'react'
import Wrapper from '../../components/admin/Wrapper'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const CourseCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [navigate, setNavigate] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNavigate(true);
    } catch (error) {
      console.error(error);
    }
  };

if (navigate) {
  return <Navigate to={'/admin/courses'}/>;
}

  return (
    <Wrapper>
            <div className="col-md-10">
              <div className="card">
                <div className="card-header card-header-light">
                  <h3 className="card-title">Create new course</h3>
                </div>
                <div className="card-body ">
                  <form className="col-8 mt-8" onSubmit={submit} autoComplete="off" noValidate>

                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter title"
                        onChange={e => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea 
                        rows={5} 
                        className="form-control" 
                        placeholder="Here can be your description"
                        onChange={e => setDescription(e.target.value)} 
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Image upload</label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={e => {
                          if (e.target.files && e.target.files.length > 0) {
                            setImage(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    <div className="form-footer col-4">
                      <button className="btn btn-primary btn-square w-100">Add new course</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
    </Wrapper>
  )
}

export default CourseCreate