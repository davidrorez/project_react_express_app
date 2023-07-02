import React, { useState } from 'react';
import { postFetch } from '../../commons/ApiMethods';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgKitchen from '../../img/kitchen.jpg';
import { useNavigate } from 'react-router-dom';

function Form({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      postFetch('api/sessions/kitchen', {
        user: {
          email: email,
          password: password,
        },
      }).then((response) => {
        console.log(response);
        setEmail('');
        setPassword('');

        if (!response.user) {
          alert('El usuario no existe');
        } else if (response.user.role !== 'kitchen') {
          alert('No tienes acceso');
        } else {
          setUser(response.user)
          navigate('/');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#cecece' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem', backgroundColor: '#FFFAF6' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={imgKitchen}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0 ">Cocina</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Inicia sesión con tu cuenta de cocina
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email}
                          placeholder='Correo eléctronico'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Correo eléctronico
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          placeholder='Contraseña'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Contraseña
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Iniciar sesión
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Form;
