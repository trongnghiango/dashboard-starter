import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import { getUser, login } from '../api/auth';
import { User } from '../routes/protected-route';

type AuthContext = {
  loading: boolean;
  authToken?: string | null;
  currentUser?: User | null;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    // Tải dữ liệu từ localStorage khi khởi tạo
    const savedData = localStorage.getItem('token');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin() {
    try {
      setLoading(true);
      const res = await login(); //side effect
      const { user, authToken: token } = res[1];
      setAuthToken(token);
      setCurrentUser(user);
      setLoading(false);
    } catch (error) {
      setAuthToken(null);
      setCurrentUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        if (!authToken) throw new Error('Denied!!!');
        setLoading(true);
        const res = await getUser(); //side effect
        const { user, authToken: token } = res[1];
        setAuthToken(token);
        setCurrentUser(user);
        setLoading(false);
      } catch (error) {
        setAuthToken(null);
        setCurrentUser(null);
        setLoading(false);
      }
    }

    //
    fetchUser();
  }, []);

  useEffect(() => {
    // Lưu dữ liệu vào localStorage khi data thay đổi
    localStorage.setItem('token', JSON.stringify(authToken));
  }, [authToken]);

  async function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.setItem('token', JSON.stringify(null));
    console.info(authToken);
  }

  console.info({ authToken });
  return (
    <AuthContext.Provider
      value={{
        loading,
        authToken,
        currentUser,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be use inside of a AuthProvider');
  return context;
}
