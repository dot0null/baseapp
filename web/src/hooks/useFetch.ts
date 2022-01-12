import { useEffect, useState } from 'react';

export function useFetch<T>(
  url: string,
  def: T,
  deps: React.DependencyList = [],
  options?: RequestInit,
): [T, FetchError | undefined, boolean] {
  const [data, setData] = useState<T>(def);
  const [error, setError] = useState<FetchError | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        setData(await fetchData(url, options));
      } catch (error) {
        setError(error as FetchError);
        setData(def);
      } finally {
        setIsLoading(false);
      }
    })();
  }, deps);

  return [data, error, isLoading];
}

async function fetchData(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (!res.ok) {
      const { errors, error, ...rest } = json ?? {};
      throw new FetchError(res.status, error ? [error] : errors ?? ['Server error'], rest);
    }
    return json;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new FetchError(500, [(error as Error).toString()], {});
  }
}

export class FetchError extends Error {
  constructor(
    public code: number,
    public messages: string[],
    public payload: Record<string, string>,
  ) {
    super();
  }
}
