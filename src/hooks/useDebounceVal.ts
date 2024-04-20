import { useEffect, useState } from "react";

export const useDebounceVal = <T>(input: T, time?: number) => {
    const [debouncedVal, setDebouncedVal] = useState<T>();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedVal(input);
        }, time ?? 300);

        return () => {
            clearTimeout(timer);
        };
    }, [input, time]);

    return [debouncedVal];
};
