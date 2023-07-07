import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Index from '../components/Orders';
import '../App.css'

function Home({ user }) {
  const [refresh, setRefresh] = useState(true);


  if (!user) {
    return <Navigate to='/login' />

  } else {

    return (
      <Index setRefresh={setRefresh} refresh={refresh} />
    )
  }
}

export default Home;