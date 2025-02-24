# Note

Dưới đây là cấu trúc thư mục cho dự án React sử dụng TypeScript (TSX) với Redux, Axios và SWR. Cấu trúc này sẽ có một số điều chỉnh để hỗ trợ TypeScript.

### Cấu trúc thư mục mẫu cho dự án TypeScript

```
my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/
│   │   └── axiosInstance.ts
│   ├── app/
│   │   ├── store.ts
│   │   └── rootReducer.ts
│   ├── components/
│   │   ├── UserProfile.tsx
│   │   └── OtherComponent.tsx
│   ├── features/
│   │   └── user/
│   │       ├── userSlice.ts
│   │       └── UserProfile.tsx
│   ├── hooks/
│   │   └── useFetchUser.ts
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── reportWebVitals.ts
└── package.json
```

### Giải thích cấu trúc thư mục

- **public/**: Chứa các file tĩnh như `index.html` và favicon.
- **src/**: Thư mục chính chứa mã nguồn.
  - **api/**: Chứa các file liên quan đến API, ví dụ như `axiosInstance.ts` để cấu hình Axios.
  - **app/**: Chứa cấu hình Redux như `store.ts` và `rootReducer.ts`.
  - **components/**: Chứa các component React reusable với phần mở rộng `.tsx`.
  - **features/**: Tổ chức theo tính năng, chứa các slice của Redux. Ví dụ, thư mục `user/` chứa `userSlice.ts` và component liên quan.
  - **hooks/**: Chứa các custom hooks, như `useFetchUser.ts` để lấy dữ liệu người dùng.
  - **styles/**: Chứa các file CSS hoặc SCSS.
  - **utils/**: Chứa các hàm tiện ích, ví dụ như `helpers.ts`.

### Ví dụ về một số file trong dự án

#### 1. `axiosInstance.ts`

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000
});

export default axiosInstance;
```

#### 2. `store.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

#### 3. `userSlice.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
```

#### 4. `UserProfile.tsx`

```typescript
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axiosInstance from '../api/axiosInstance';
import { setUser, setError } from '../features/user/userSlice';

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: any) => state.user);

  const { data: apiData, error: swrError } = useSWR('/user', fetcher, {
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: (error) => {
      dispatch(setError(error.message));
    },
  });

  if (loading) return <div>Loading...</div>;
  if (swrError || error) return <div>Error loading data</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(data || apiData, null, 2)}</pre>
    </div>
  );
};

export default UserProfile;
```

### Kết luận

Cấu trúc thư mục này giúp bạn tổ chức mã nguồn một cách hợp lý cho dự án React sử dụng TypeScript. Các file có phần mở rộng `.ts` cho TypeScript và `.tsx` cho các component React. Bạn có thể điều chỉnh các kiểu dữ liệu và cấu trúc theo nhu cầu cụ thể của dự án.
