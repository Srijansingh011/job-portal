import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading: false,  // always starts as false — never persist a stale loading:true
        user: null
    },
    reducers:{
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        // When redux-persist rehydrates, force loading back to false
        builder.addMatcher(
            (action) => action.type === 'persist/REHYDRATE',
            (state) => {
                state.loading = false;
            }
        );
    }
});
export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;