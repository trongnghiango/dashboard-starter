// src/hooks/useFetchUser.ts
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import axiosInstance from '../api/axiosClient';
import { setError, setUser } from '../features/user/userSlice';

// Hàm fetcher sử dụng Axios
const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const useFetchUser = () => {
  const dispatch = useDispatch();

  const { data, error } = useSWR('/user', fetcher, {
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    }
  });

  console.log({ data, error });

  return {
    data,
    error,
    isLoading: !error && !data
  };
};

export default useFetchUser;
