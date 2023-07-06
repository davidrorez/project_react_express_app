import React, { useState, useEffect } from 'react';
import { getFetch } from '../../commons/ApiMethods';
import WithLoadingState from '../../commons/WithLoadingState';
import List from '../../commons/List';
import ActionCable  from 'actioncable';

function Index({ refresh, setRefresh }) {

	const LoadingList = WithLoadingState(List);
	const [contents, setContents] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		const cable = ActionCable.createConsumer('localhost:3000');
		const channel = cable.subscriptions.create('appearance_channel', {
			received: (data) => {
				setContents((prevContents) => [...prevContents, data]);
			},
		});

		if (!refresh) return
		setLoading(true);
		getFetch('api/orders').then((data) => {
			setContents(data);
			setLoading(false);
		});
		setRefresh(false)

		return () => {
			channel.unsubscribe();
		};
	}, [setContents, setLoading, refresh, setRefresh]); 

	return (
		<div>
			<h2 style={{ margin: "4px" }}>Lista de Ordenes</h2>
			<LoadingList isLoading={loading} contents={contents} />
		</div>
	);
}
export default Index;