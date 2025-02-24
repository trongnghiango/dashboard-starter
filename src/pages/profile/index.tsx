// src/components/UserProfile.tsx

import { useSelector } from 'react-redux';
import useFetchUser from '../../hooks/useFetchUser';

export default function UserProfile() {
  const { data, error, isLoading } = useFetchUser();
  const userData = useSelector((state: any) => state.user.data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {/* <pre>{JSON.stringify(data || userData, null, 2)}</pre> */}
    </div>
  );
}
