import React from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Users from './pages/users/Users';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Courses from './pages/courses/Courses';
import { UserCreate } from './pages/users/UserCreate';
import { UserEdit } from './pages/users/UserEdit';
import CourseCreate from './pages/courses/CourseCreate';
import CourseEdit from './pages/courses/CourseEdit';
import CourseView from './pages/CourseView';

function App() {
  return (
  <div className="App">  
  <BrowserRouter>
    <Routes>
      <Route path={'/admin/dashboard'} Component={Dashboard} />
      <Route path={'/admin/students'} Component={Users} />
      <Route path={'/register'} Component={Register} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path={'/admin/courses'} Component={Courses} />
      <Route path={'/admin/students/create'} Component={UserCreate} />
      <Route path={'/admin/students/:id/edit'} Component={UserEdit} />
      <Route path={'/admin/courses/create'} Component={CourseCreate} />
      <Route path={'/admin/courses/:id/edit'} Component={CourseEdit} />

      <Route path={'/home'} Component={Home} />
      <Route path={'/course/:id/view'} Component={CourseView} />
    </Routes> 
  </BrowserRouter>
  </div>
  );
}

export default App;

