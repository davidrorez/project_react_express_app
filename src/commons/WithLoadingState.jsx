import React from "react";

function WithLoadingState(Component) {
	return function WithLoadingState({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />
		return (
			<p style={{ marginLeft: '15px' }}>Cargando información...</p>
		)
	}
}

export default WithLoadingState;