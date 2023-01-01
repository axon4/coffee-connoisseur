import useSWR from 'swr';

export function useWrappedSWR(path) {
    const fetcher = (...fetchArguments) => fetch(...fetchArguments).then(response => response.json());

    return useSWR(path, fetcher);
};