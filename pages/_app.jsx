import { createContext, useReducer } from 'react';
import '../styles/globals.css';

export const ShopContext = createContext();

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
					coordinates: payload
				};
				
			case 'SET_SHOPS':
				return {
					...state,
					shops: payload
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

function Application({ Component, pageProps }) {
	return (
		<ShopProvider>
			<Component {...pageProps} />
		</ShopProvider>
	);
};

export default Application;