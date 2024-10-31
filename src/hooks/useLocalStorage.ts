import { useEffect, useState } from "react";

// Custom hook for persisting state to localStorage
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    
    // Initialize state with a function to avoid running JSON.parse on every render
    const [value, setValue] = useState<T>(() => {
        // Attempt to retrieve the stored item from localStorage by key
        const jsonValue = localStorage.getItem(key);

        // If a value exists in localStorage, parse and return it as the initial state
        if (jsonValue != null) return JSON.parse(jsonValue);

        // If no value exists in localStorage, check if initialValue is a function
        // If it is, call it to get the initial state; otherwise, use initialValue as is
        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    // useEffect hook to update localStorage whenever the value or key changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]); // Re-run effect when key or value changes

    // Return the current state and setter function as a tuple
    return [value, setValue] as [typeof value, typeof setValue];
}