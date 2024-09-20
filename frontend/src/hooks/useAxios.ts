import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

const useAxios = <T>(
  fetchFunction: (...args: any[]) => Promise<T>, // api 함수
  requestData?: any // 전달 데이터
): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFunction({
          ...requestData,
        });
        setData(response);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else if (err && (err as AxiosError).isAxiosError) {
          setError(err as AxiosError); // AxiosError일 경우에만 설정
        } else {
          setError(new Error("An unknown error occurred") as AxiosError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, requestData]);

  return { data, loading, error };
};

export default useAxios;
