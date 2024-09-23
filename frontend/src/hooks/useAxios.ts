import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

type FetchFunction<T> = (
  ...args: unknown[]
) => Promise<AxiosResponse<T>> | null;

// TODO: api 호출 함수 자체를 props로 줄지.. 정해야함..
const useAxios = <T>(
  fetchFunction: FetchFunction<T>, // api 함수
  initialData: T | null, // 초기 데이터
  ...args: unknown[] // api 함수 넘겨줄 인자
) => {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    // 사용자가 컴포넌트가 언마운트될 때
    const source = axios.CancelToken.source(); // 요청 취소를 위한 CancelToken 생성

    const fetchData = async () => {
      setLoading(true);
      setIsError(false);
      setError(null);

      try {
        const response = await fetchFunction(...args, {
          cancelToken: source.token,
        });
        if (response) setData(response.data);
      } catch (err) {
        setData(null);

        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else if (err && (err as AxiosError).isAxiosError) {
          setError(err as AxiosError); // AxiosError일 경우에만 설정
          setIsError(true);
        } else {
          setError(new Error("An unknown error occurred") as AxiosError);
          setIsError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Request canceled by component unmount."); // 요청 취소
    };
  }, [fetchFunction, ...args]);

  return { data, isLoading, isError, error };
};

export default useAxios;
