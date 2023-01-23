import { useContext, useState } from 'react';
import { ShopConText } from '../conTexts/shopConText';

export function useLocation() {
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState('');
	const { disPatch } = useContext(ShopConText);

	const success = position => {
		const { latitude, longitude } = position.coords;

		disPatch({
			type: 'SET_COORDINATES',
			payLoad: `${latitude},${longitude}`
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
			setError('GeoLocation-API UnSupported in Browser');
		} else {
			setLoading(true);
			navigator.geolocation.getCurrentPosition(success, failure);
		};
	};

	return { locate, loading, error };
};