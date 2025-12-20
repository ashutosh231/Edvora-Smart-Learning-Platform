import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {

    //{for accessing user data in the entire app}
    setUser(state, value) {
      state.user = value.payload

      // persist to localStorage so profile data (e.g., photo) survives refresh
      if (value?.payload) {
        localStorage.setItem("user", JSON.stringify(value.payload))
      } else {
        localStorage.removeItem("user")
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    }
})

export const { setUser,setLoading } = profileSlice.actions;
export default profileSlice.reducer;

