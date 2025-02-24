// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
  // Bạn có thể thêm middleware hoặc các tùy chọn khác ở đây
});

// Export các kiểu để sử dụng trong toàn bộ ứng dụng
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
