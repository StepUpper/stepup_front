import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

const useAxios = <T>(
  fetchFunction: ((...args: any[]) => Promise<AxiosResponse<T>>) | null, // api 함수
  requestData?: any // 전달 데이터
): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (!fetchFunction) return; // 호출 함수 없는 경우 실행 x

    // 사용자가 컴포넌트가 언마운트될 때
    const source = axios.CancelToken.source(); // 요청 취소를 위한 CancelToken 생성

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFunction({
          ...requestData,
          cancelToken: source.token,
        });
        if (response) setData(response.data);
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

    return () => {
      source.cancel("Request canceled by component unmount."); // 요청 취소
    };
  }, [fetchFunction, requestData]);

  return { data, loading, error };
};

export default useAxios;
