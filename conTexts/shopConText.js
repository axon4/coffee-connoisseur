import { createContext, useReducer } from 'react';

export const ShopConText = createContext();

function ShopProvider({ children }) {
	const initialState = {
		coOrdinates: '',
		shops: []
	};

	const reducer = (state, { type, payLoad }) => {
		switch (type) {
			case 'SET_COORDINATES':
				return {
					...state,
					coordinates: payLoad
				};

			case 'SET_SHOPS':
				return {
					...state,
					shops: payLoad
				};

			default:
				throw new Error(`InCorrect Action-Type: ${type}`);
		};
	};

	const [ state, disPatch ] = useReducer(reducer, initialState);

	return (
		<ShopConText.Provider value={{ state, disPatch }}>
			{children}
		</ShopConText.Provider>
	);
};

export default ShopProvider;