import { useState } from 'react';

interface UseFetchDataResponse<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
}

const useFetchData = <T>(url: string, triggerFetch: boolean): UseFetchDataResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Si triggerFetch est vrai, on lance l'appel API
    if (triggerFetch) {
        fetchData();
    }

    return { data, isLoading, isError };
};

export default useFetchData;
