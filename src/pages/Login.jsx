import React from "react";
import Form from "../components/Users/form";
import { Navigate } from "react-router-dom";

function Login({ user, setUser }) {
  if (!user) {
    return (
      <div>
        <Form setUser={setUser} />
      </div>
    );
  }

  return <Navigate to="/login" />;
}

export default Login;
