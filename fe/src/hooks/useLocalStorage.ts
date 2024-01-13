import { useState, useEffect } from "react";

export enum LocalStorageKey {
    UserID = "USER_ID",
}

const getLocalStorageValue = (key: LocalStorageKey) => {
    if (typeof window !== "undefined" && !localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key)!);
    }
};

const useLocalStorage = <T>(key: LocalStorageKey, initialValue?: T) => {
    const storedValue = getLocalStorageValue(key) ?? initialValue;
    const [localValue, setLocalValue] = useState(storedValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(localValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setValue = (newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalValue(newValue);
    };

    return [localValue, setValue];
};

export default useLocalStorage;
