// src/app/rootReducer.ts
import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
  user: userReducer
  // Bạn có thể thêm các reducer khác vào đây
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
