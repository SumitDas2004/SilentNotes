import { createSlice, current } from "@reduxjs/toolkit";

const PostReducer = createSlice({
  name: "postReducer",
  initialState: {
    posts: [],
    pageNumber: 0,
    visitedPosts: []
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
    nextPage:(state)=>{
      state.pageNumber+=1;
    },
    visitPost:(state, action)=>{
      state.visitedPosts = [...state.visitedPosts, action.payload]
    }
  },
});

export const { addPosts, nextPage, visitPost } = PostReducer.actions;
export default PostReducer.reducer;
