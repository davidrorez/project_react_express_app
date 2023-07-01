import React from 'react';
import { Navigate } from 'react-router-dom';

function Home({ user }) {
  

	if (!user) {

		return <Navigate to='/login'/>
	} else {

    return (

      <h1>Aqui va el index de las ordenes</h1>
    )
  }
}

export default Home;