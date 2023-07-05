import React from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const List = ({ contents }) => {

  const colorTh = '#7D8283';
  const colorTd = '#EDF0ED';
  const colorTxt = 'white';

  if (!contents || contents.length === 0) {
    return <p>No hay ordenes</p>
  }
  if (!Array.isArray(contents)) {
    return <p>El contenido no es un array válido</p>;
  }
  return (
    <div style={{ margin: '15px' }}>
      <Table striped responsive size='lg'>
        <thead>
          <tr>
            <th style={{backgroundColor: colorTh, color: colorTxt}}>Id</th>
            <th style={{backgroundColor: colorTh, color: colorTxt}}>Nombre cliente</th>
            <th style={{backgroundColor: colorTh, color: colorTxt}}>Fecha de creación</th>
            <th style={{backgroundColor: colorTh, color: colorTxt}}>Estado</th>
            <th style={{backgroundColor: colorTh, color: colorTxt}}>Platos</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(({ id, state, client, created_at, dishes }) => {
            if (state === 'cancelled' || state === 'delivered') {
              return null;
            }
            if (state === 'on_Time') {
              state = 'A tiempo'
            } else if (state === 'late') {
              state = 'Demorado'
            } else if (state === 'delayed') {
              state = 'Sobre tiempo'
            }
            return (
              <tr key={id}>
                <td style={{backgroundColor: colorTd}}>{id}</td>
                <td style={{backgroundColor: colorTd}}>{client.first_name + ' ' + client.last_name}</td>
                <td style={{backgroundColor: colorTd}}>{created_at}</td>
                <td style={{backgroundColor: colorTd}}>{state}</td>
                <td style={{backgroundColor: colorTd}}>{dishes}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
    </div>
  );
};

export default List;