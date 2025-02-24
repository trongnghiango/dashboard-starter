import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';

export type User = {
  id: number;
  name: string;
  role: string;
};

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles: User['role'][];
};
export default function ProtectedRoute({
  allowedRoles,
  children
}: ProtectedRouteProps) {
  const { currentUser, authToken, loading } = useAuth(); // Giả sử useAuth trả về loading
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authToken) {
      // Điều hướng tới trang đăng nhập nếu currentUser không tồn tại
      navigate('/login');
    }
  }, [authToken, loading, navigate]);

  // Nếu đang tải thông tin người dùng, có thể hiển thị Loading...
  if (loading) {
    return <div>Loading...</div>;
  }

  // Kiểm tra quyền truy cập
  if (currentUser && !allowedRoles.includes(currentUser.role)) {
    return <div>Permission Denied</div>;
  }

  return children;
}
