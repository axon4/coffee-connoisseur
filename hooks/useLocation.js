import { useContext, useState } from 'react';
import { ShopContext } from '../pages/_app';

export function useLocation() {
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState('');
	const { dispatch } = useContext(ShopContext);

	const success = position => {
		const { latitude, longitude } = position.coords;

		dispatch({
			type: 'SET_COORDINATES',
			payload: `${latitude},${longitude}`
		});
		setLoading(false);
		setError('');
	};

	const failure = error => {
		setLoading(false);
		setError(error.message
			.split(' ')
			.map(word => {
				let parsedWord = word;

				if (word.toUpperCase() === 'GEOLOCATION') {
					parsedWord = word.replace('l', 'L'); // LOOL
				};

				return parsedWord.charAt(0).toUpperCase() + parsedWord.substr(1);
			})
			.join(' ')
		);
	};

	const locate = () => {
		if (!navigator.geolocation) {
			setError('GeoLocation API is UnSupported in your Browser');
		} else {
			setLoading(true);
			navigator.geolocation.getCurrentPosition(success, failure);
		};
	};

	return {
		locate,
		loading,
		error
	};
};