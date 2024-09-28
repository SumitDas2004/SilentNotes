import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchPosts = createAsyncThunk(
  "feedPage/fetchPosts",
  async (arg, { rejectWithValue, getState }) => {
    const appState = getState();
    const userId = appState.userdetails.id;
    const cursor = appState.posts.cursor;
    try {
      const { data } = await axios({
        url:
          import.meta.env.VITE_BACKEND +
          `/post/feed?pageSize=10${userId && "&userId=" + userId}`,
        data: {
          lastCreatedAt: cursor.lastCreatedAt,
          lastId: cursor.lastId,
        },
        method: "POST",
      });
      return data.data;
    } catch ({ response }) {
      return rejectWithValue(
        (response && response.data && response.data.error) ||
          "Something went wrong."
      );
    }
  }
);

const PostReducer = createSlice({
  name: "postReducer",
  initialState: {
    posts: [],
    visitedPosts: [],
    cursor: {
      lastId: "{",
      lastCreatedAt: new Date().toJSON(),
    },
    loadingPosts: false,
  },
  reducers: {
    nextPage: (state, action) => {
      state.cursor.lastCreatedAt = action.payload.lastCreatedAt;
      state.cursor.lastId = action.payload.lastId;
    },
    visitPost: (state, action) => {
      state.visitedPosts = [...state.visitedPosts, action.payload];
    },
    likePost: (state, action) => {
      const postIndex = action.payload.index
      state.posts[postIndex].likes+=action.payload.event
      state.posts[postIndex].liked=action.payload.event==1
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loadingPosts = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      if (action.payload.length > 0) {
        state.cursor.lastCreatedAt =
          action.payload[action.payload.length - 1].createdAt;
        state.cursor.lastId = action.payload[action.payload.length - 1].id;
      }
      state.loadingPosts = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loadingPosts = false;
      toast.error(action.payload);
    });
  },
});

export const { nextPage, visitPost, likePost } = PostReducer.actions;
export default PostReducer.reducer;
