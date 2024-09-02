import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findUserById } from '../lib/supabase';

type TUser = {
    id: string,
    fullname?: string
    email: string,
    username: string,
    address?: string,
    token_address?: string,
    key?: string,
    accumulation?: number,
    dp?: string,
    titles?: Array<string>,
    gender?: string,
    language?: string,
    location?: boolean,
    interests?: Array<string>,
    birthday?: string,
    country?: string,
    website?: string,
    tel?: string,
    bio?: string,
    private?: boolean,
    ghost?: boolean,
    verified?: boolean
}

type TInitialState = {
    user: TUser | null,
    loading: boolean,
    error: boolean,
}

const initialState: TInitialState = {
    user: null,
    loading: true,
    error: false,
}

export const fetchUser = createAsyncThunk('auth/user', async() => {
    const userid = await AsyncStorage.getItem('user');
    try {
        // const { data } = await axios.get(`${AppRoot}/${userid}`);
        if (userid) {
            const user = await findUserById(userid as string)
            return user;
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
});

export const registerUser = createAsyncThunk('auth/register', async(userInfo: TUser) => {
    AsyncStorage.setItem('user', userInfo.id);
    return userInfo;
});

export const loginUser = createAsyncThunk('auth/login', async(userInfo: TUser) => {
    AsyncStorage.setItem('user', userInfo.id);
    return userInfo;
});

export const logoutUser = createAsyncThunk('auth/logout', async() => {
    await AsyncStorage.removeItem('user');
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload as TUser;
                state.loading = false;
                state.error = false;
            })
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = false;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = false;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = false;
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export default authSlice.reducer;