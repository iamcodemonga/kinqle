import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findUserById, getAllUserFlips, getAllUserPosts } from '../lib/supabase';

type TPost = {
    id: string,
    creator_id: string,
    type: string,
    url: string,
    thumbnail?: string,
    blurhash?: string,
    orientation?: string,
    category?: string,
    description?: string,
    network?: string,
    hashtags?: Array<string>,
    value?: number,
    streams?: number,
    views?: number,
    worth?: string,
    commenting?: boolean,
    premium?: boolean,
    folder?: string,
    created_at: string,
}

const initialState = {
    myUploads: [],
    myFlips: [],
    // myArchive: [],
    // stageContents: [],
    // audienceContents: [],
    // flipsForYou: [],
    // trendsForYou: [],
    // trendingHashtags: [],
    // trendingCategories: [],
    // suggestedCreators: [],
    // topCreators: [],
    myUploadsLoading: false,
    myUploadsError: false,
    myUploadsSuccess: false,
    myFlipsLoading: false,
    myFlipsError: false,
    myFlipsSuccess: false,
    // myArchiveLoading: false,
    // myArchiveError: false,
    // myArchiveSuccess: false,
    // stageContentsLoading: false,
    // stageContentsError: false,
    // stageContentsSuccess: false,
    // audienceContentsLoading: false,
    // audienceContentsError: false,
    // audienceContentsSuccess: false,
    // flipsForYouLoading: false,
    // flipsForYouError: false,
    // flipsForYouSuccess: false,
    // trendsForYouLoading: false,
    // trendsForYouError: false,
    // trendsForYouSuccess: false,
    // trendingHashtagsLoading: false,
    // trendingHashtagsError: false,
    // trendingHashtagsSuccess: false,
    // trendingCategoriesLoading: false,
    // trendingCategoriesError: false,
    // trendingCategoriesSuccess: false,
    // suggestedCreatorsLoading: false,
    // suggestedCreatorsError: false,
    // suggestedCreatorsSuccess: false,
    // topCreatorsLoading: false,
    // topCreatorsError: false,
    // topCreatorsSuccess: false
}

// const initialState: TInitialState = {
//     user: null,
//     loading: true,
//     error: false,
// }

export const fetchMyUploads= createAsyncThunk('content/myuploads', async(creator: string) => {
    try {
        const result = await getAllUserPosts(creator, 0, 9);
        return result;
    } catch (error) {
        console.log(error)
    }
});

export const fetchMyFlips= createAsyncThunk('content/myflips', async(creator: string) => {
    try {
        const result = await getAllUserFlips(creator, 0, 9);
        return result;
    } catch (error) {
        console.log(error)
    }
});

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyUploads.fulfilled, (state, action) => {
                state.myUploads = action.payload as any;
                state.myUploadsLoading = false;
                state.myUploadsError = false;
            })
            .addCase(fetchMyUploads.pending, (state, action) => {
                state.myUploadsLoading = true;
                state.myUploadsError = false;
            })
            .addCase(fetchMyUploads.rejected, (state, action) => {
                state.myUploadsLoading = false;
                state.myUploadsError = true;
            })
            .addCase(fetchMyFlips.fulfilled, (state, action) => {
                state.myFlips = action.payload as any;
                state.myFlipsLoading = false;
                state.myFlipsError = false;
            })
            .addCase(fetchMyFlips.pending, (state, action) => {
                state.myFlipsLoading = true;
                state.myFlipsError = false;
            })
            .addCase(fetchMyFlips.rejected, (state, action) => {
                state.myFlipsLoading = false;
                state.myFlipsError = true;
            })
    }
})

export default contentSlice.reducer;