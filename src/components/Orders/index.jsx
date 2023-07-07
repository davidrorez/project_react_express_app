import React, { useState, useEffect } from 'react';
import { getFetch } from '../../commons/ApiMethods';
import WithLoadingState from '../../commons/WithLoadingState';
import List from '../../commons/List';
import ActionCable from 'actioncable';


function Index({ refresh, setRefresh }) {

	const LoadingList = WithLoadingState(List);
	const [contents, setContents] = useState([]);
	const [loading, setLoading] = useState(false);
	let cable;

	useEffect(() => {
		cable = ActionCable.createConsumer('ws://localhost:3000/cable');

		const receivedHandler = (data) => {
			setContents((prevContents) => {
				console.log(prevC)
				const updatedContents = [...prevContents];
				const index = updatedContents.findIndex((content) => content.id === data.id);
				if (index !== -1) {
					updatedContents[index] = data;
				}
				return updatedContents;
			});
		};

		cable.subscriptions.create({ channel: 'OrdersChannel' }, { received: receivedHandler });

		return () => {
			cable.subscriptions.remove(cable.subscriptions.subscriptions[0]);
			cable.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!refresh) return;

		setLoading(true);
		getFetch('api/orders').then((data) => {
			setContents(data);
			setLoading(false);
		});

		setRefresh(false);
	}, [refresh]);

	return (
		<>
			<h2 style={{ margin: '15px', color: '#7D8283' }}>Lista de Ordenes</h2>
			<LoadingList isLoading={loading} contents={contents} />
		</>
	);
}

export default Index;
