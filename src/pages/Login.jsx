import React from 'react';
import Form from '../components/Users/form';
import { Navigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Login({ user, setUser }) {

  if (!user) {
    return <div>

      <Form setUser={setUser} />

    </div>
  }

  return (
    <Navigate to='/login' />
  );
}

export default Login;