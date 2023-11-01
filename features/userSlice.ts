import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  currentUser: any;
  error: any;
  loading: boolean;
}

const storageUser = () => {
  const user = localStorage.getItem("user") || null;
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

const initialState: InitialState = {
  currentUser: storageUser() || null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
