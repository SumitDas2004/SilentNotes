import { createSlice, current } from "@reduxjs/toolkit";

const PostReducer = createSlice({
  name: "postReducer",
  initialState: {
    posts: [],
  },
  reducers: {
    addPosts: (state, action) => {
      const posts = current(state.posts);
      const newPosts = action.payload;
      const set = new Set(posts.map((post) => post.id));
      const newState = [...posts];
      newPosts.forEach((post) => {
        if (!set.has(post.id)) newState.push(post);
      });
    //   console.log(current(state.posts));
      state.posts = newState
    },
  },
});

export const { addPosts } = PostReducer.actions;
export default PostReducer.reducer;
