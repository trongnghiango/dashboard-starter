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
