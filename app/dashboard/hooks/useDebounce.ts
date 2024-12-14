import { useState, useRef } from 'react';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Fonction qui gère le debounce sans `useEffect`
    const handleDebounce = (newValue: string) => {
        // Annule le timeout précédent si présent
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        // Crée un nouveau timeout
        timeoutId.current = setTimeout(() => {
            setDebouncedValue(newValue); // Met à jour la valeur après le délai
        }, delay);
    };

    return [debouncedValue, handleDebounce] as const;
};

export default useDebounce;
