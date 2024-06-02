import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    isLoggedIn: boolean;
  };
  unread?: number;
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    token: "",
    isLoggedIn: false,
  },
  unread: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    setUnread: (state, action) => {
      state.unread = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUnread } = userSlice.actions;

export default userSlice.reducer;
