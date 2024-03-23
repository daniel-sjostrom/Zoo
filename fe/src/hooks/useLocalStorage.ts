import { useState, useEffect } from "react";

export enum LocalStorageKey {
    UserID = "USER_ID",
}

const useLocalStorage = <T>(
    key: string,
    initialValue?: T
): [T, (arg: T) => void] => {
    // Get stored value from local storage or use initial value
    const storedValue: T = (() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue || null;
        } catch (error) {
            console.error("Error retrieving data from local storage:", error);
            return initialValue || null;
        }
    })();

    // State to hold the current value
    const [value, setValue] = useState<T>(storedValue);

    // Update local storage when the value changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error storing data in local storage:", error);
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
