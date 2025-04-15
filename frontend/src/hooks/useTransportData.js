import { useState, useEffect } from 'react';
import { fetchTransportOptions } from '../services/api';

const useTransportData = () => {
    const [transportOptions, setTransportOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTransportOptions = async () => {
            try {
                const options = await fetchTransportOptions();
                setTransportOptions(options);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getTransportOptions();
    }, []);

    return { transportOptions, loading, error };
};

export default useTransportData;