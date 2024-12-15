import { useState, useRef } from 'react';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleDebounce = (newValue: string) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            setDebouncedValue(newValue); 
        }, delay);
    };

    return [debouncedValue, handleDebounce] as const;
};

export default useDebounce;
