import { createContext, useReducer } from 'react';
import '../styles/globals.css';

function Application({ Component, pageProps }) {
	const ShopContext = createContext();

	const ShopProvider = ({ children }) => {
		const initialState = {
			coordinates: '',
			shops: []
		};

		const reducer = (state, { type, payload }) => {
			switch (type) {
				case 'SET_COORDINATES':
					return {
						...state,
						coordinates: payload.coordinates
					};
					
				case 'SET_SHOPS':
					return {
						...state,
						shops: payload.shops
					};

				default:
					throw new Error(`InCorrect Action Type: ${type}`);
			};
		};

		const [ state, dispatch ] = useReducer(reducer, initialState);

		return (
			<ShopContext.Provider value={{ state, dispatch }}>
				{children}
			</ShopContext.Provider>
		);
	};

	return (
		<ShopProvider>
			<Component {...pageProps} />
		</ShopProvider>
	);
};

export default Application;