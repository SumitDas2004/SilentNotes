package com.silentNotes.Main.service;

import com.silentNotes.Main.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class LikeService {

    UserService userService;
    PostService postService;
    CommentService commentService;

    public LikeService(UserService userService, PostService postService, CommentService commentService) {
        this.userService = userService;
        this.postService = postService;
        this.commentService = commentService;
    }

    @Transactional
    public int likePost(String postId, String userId){
        Users user = userService.getUserById(userId);
        Post post = postService.getPost(postId);
        PostLike like = PostLike.builder()
                .user(user)
                .post(post)
                .build();
        int res = -1;
        if(post.getLikes().contains(like)){
            post.getLikes().remove(like);
            user.getLikedPosts().remove(like);
        }else{
            post.getLikes().add(like);
            user.getLikedPosts().add(like);
            res = 1;
        }
        postService.savePost(post);
        userService.saveUser(user);
        return res;
    }

    @Transactional
    public int likeComment(String userId, String id){
        Comment comment =  commentService.getCommentById(id);
        CommentLike like= CommentLike.builder()
                .comment(comment)
                .userId(userId)
                .build();
        int res = -1;
        if(comment.getLikes().contains(like)){
            comment.getLikes().remove(like);
        }else{
            comment.getLikes().add(like);
            res = 1;
        }
        commentService.saveComment(comment);
        return res;
    }

    @Transactional
    public int likeReply(String replyId, String userId){
        CommentReply reply = commentService.getReplyById(replyId);
        CommentReplyLike like=  CommentReplyLike.builder()
                .userId(userId)
                .commentReply(reply)
                .build();

        int res = -1;
        if(reply.getLikes().contains(like)){
            reply.getLikes().remove(like);
        }else{
            reply.getLikes().add(like);
            res = 1;
        }
        commentService.saveReply(reply);
        return res;
    }
}
