import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


const List = ({ contents }) => {
	if (!contents || contents.length === 0) {
		return <p>No hay ordenes</p> 
	}
	if (!Array.isArray(contents)) {
		return <p>El contenido no es un array válido</p>;
	  }
	  return (
		<div className="table-responsive">
			<Table striped>
				<thead>
					<tr>
						<th>Id</th>
						<th>Nombre cliente</th>
						<th>Fecha de creación</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{contents.map(({ id, state, client, created_at }) => (
						<tr>
							<td>{id}</td>
							<td>{client.first_name + " " + client.last_name}</td>	
							<td>{created_at}</td>
							<td>{state}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<br />
		</div>
	);
}
export default List;
