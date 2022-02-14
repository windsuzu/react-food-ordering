import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback((requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);

        fetch(requestConfig.url, {
            method: requestConfig.method || "GET",
            headers: requestConfig.headers || {},
            body: requestConfig.body
                ? JSON.stringify(requestConfig.body)
                : null,
        })
            .then((res) => {
                if (!res.ok) throw new Error("Request failed!");
                return res.json();
            })
            .then(applyData)
            .catch((err) => setError(err.message || "Something went wrong!"))
            .finally(() => setIsLoading(false));
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
