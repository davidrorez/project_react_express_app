import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { putFetch } from './ApiMethods';

const List = ({ contents }) => {
  const [orders, setOrders] = useState([]);
  const [lastDeliveredOrder, setLastDeliveredOrder] = useState(null);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const colorTh = '#7D8283';
  const colorTd = '#EDF0ED';
  const colorTxt = 'white';
  const statesTxt = { on_Time: 'A tiempo', late: 'Demorado', delayed: 'Sobre tiempo' };

  useEffect(() => {
    setOrders(contents);
  }, [contents]);

  const handleOrderUpdate = async (orderId) => {
    try {
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          setDeliveredOrder(order);
          setLastDeliveredOrder(order); // Guardar la orden anterior
          return { ...order, state: 'delivered' };
        }
        return order;
      });

      await putFetch(`api/orders/${orderId}`, { state: 'delivered' });
      setOrders(updatedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUndoDeliver = async () => {
    try {
      const orderId = lastDeliveredOrder.id;
      const previousState = lastDeliveredOrder.state;

      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return { ...order, state: previousState };
        }
        return order;
      });

      await putFetch(`api/orders/${orderId}`, { state: previousState });
      setOrders(updatedOrders);
      setDeliveredOrder(null); // Reiniciar la orden entregada
      setLastDeliveredOrder(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (!orders || orders.length === 0) {
    return <p>No hay órdenes</p>;
  }

  if (!Array.isArray(orders)) {
    return <p>No hay conexión</p>;
  }

  return (
    <div style={{ margin: '15px' }}>
      <Table striped responsive size='lg'>
        <thead>
          <tr>
            <th style={{ backgroundColor: colorTh, color: colorTxt }}>Id</th>
            <th style={{ backgroundColor: colorTh, color: colorTxt }}>Nombre cliente</th>
            <th style={{ backgroundColor: colorTh, color: colorTxt }}>Fecha de creación</th>
            <th style={{ backgroundColor: colorTh, color: colorTxt }}>Estado</th>
            <th style={{ backgroundColor: colorTh, color: colorTxt }}>Platos</th>
            <th style={{ backgroundColor: colorTh, color: colorTxt }}></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, state, client, created_at, dishes }) => {
            if (deliveredOrder && id === deliveredOrder.id) {
              return null; // Omitir la orden entregada
            }

            if (dishes.length === 0) {
              return null;
            }

            if (state === 'cancelled' || state === 'delivered') {
              return null;
            }

            const stateText = statesTxt[state] || state;
            let stateColor = '';
            switch (state) {
              case 'on_Time':
                stateColor = 'green';
                break;
              case 'late':
                stateColor = 'red';
                break;
              case 'delayed':
                stateColor = 'yellow';
                break;
              default:
                break;
            }

            return (
              <tr key={id}>
                <td style={{ backgroundColor: colorTd }}>{id}</td>
                <td style={{ backgroundColor: colorTd }}>{client.first_name + ' ' + client.last_name}</td>
                <td style={{ backgroundColor: colorTd }}>{created_at}</td>
                <td style={{ backgroundColor: colorTd, color: stateColor }}>{stateText}</td>
                <td style={{ backgroundColor: colorTd }}>{dishes}</td>
                <td style={{ backgroundColor: colorTd }}>
                  <button className='btn btn-primary' onClick={() => handleOrderUpdate(id)}>Entregar orden</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {deliveredOrder && (
        <div>
          <h2>Orden Entregada:</h2>
          <p>ID: {deliveredOrder.id}</p>
          {/* Mostrar más detalles de la orden entregada */}
          <button className='btn btn-secondary' onClick={handleUndoDeliver}>Deshacer</button>
        </div>
      )}
    </div>
  );
};

export default List;
