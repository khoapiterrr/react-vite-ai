import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ data: null, error: null, loading: true });
    try {
      const data = await asyncFunction();
      setState({ data, error: null, loading: false });
    } catch (error) {
      setState({ data: null, error: error as Error, loading: false });
    }
  }, []);

  return { ...state, execute };
}

export default useAsync; 