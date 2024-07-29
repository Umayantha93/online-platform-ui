import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/admin/Wrapper'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

const CourseEdit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [navigate, setNavigate] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (
        async () => {
            try {
                if (id) {
                    const { data } = await axios.get(`/courses/${id}`);
                    setTitle(data.data.title);
                    setDescription(data.data.description);
                    setImageUrl(`${data.data.image}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    )();
}, [id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PUT')
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(`/courses/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNavigate(true);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  if (navigate) {
    return <Navigate to={'/admin/courses'} />;
  }


  return (
    <Wrapper>
        <div className="col-md-10">
          <div className="card">
            <div className="card-header card-header-light">
              <h3 className="card-title">Update new course</h3>
            </div>
            <div className="card-body ">
              <form className="col-8 mt-8" onSubmit={submit} autoComplete="off" noValidate>

                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    rows={5} 
                    className="form-control" 
                    placeholder="Here can be your description"
                    value={description}
                    onChange={e => setDescription(e.target.value)} 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image upload</label>
                  {imageUrl && <img src={imageUrl} alt="Course" style={{ width: '100px', height: '100px', display: 'block', marginBottom: '10px' }} />}
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

export default CourseEdit