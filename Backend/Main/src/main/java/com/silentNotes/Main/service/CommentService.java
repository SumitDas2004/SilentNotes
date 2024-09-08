package com.silentNotes.Main.service;

import com.silentNotes.Main.dao.CommentDao;
import com.silentNotes.Main.dto.comment.CommentReplyDTO;
import com.silentNotes.Main.dao.CommentReplyDao;
import com.silentNotes.Main.dto.comment.GetCommentDTO;
import com.silentNotes.Main.dto.comment.GetCommentReplyDTO;
import com.silentNotes.Main.dto.post.CommentRequestDTO;
import com.silentNotes.Main.entity.Comment;
import com.silentNotes.Main.entity.CommentReply;
import com.silentNotes.Main.entity.Post;
import com.silentNotes.Main.entity.Users;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    UserService userService;
    PostService postService;
    CommentDao commentDao;
    CommentReplyDao commentReplyDao;

    public CommentService(UserService userService, PostService postService, CommentDao commentDao, CommentReplyDao commentReplyDao) {
        this.userService = userService;
        this.postService = postService;
        this.commentDao = commentDao;
        this.commentReplyDao = commentReplyDao;
    }

    public void addComment(String userId, CommentRequestDTO request){
        Users user = userService.getUserById(userId);

        Post post = postService.getPost(request.getPostId());

        Comment comment = Comment.builder()
                .replies(new ArrayList<>())
                .body(request.getBody())
                .likes(new HashSet<>())
                .user(user)
                .post(post)
                .build();

        saveComment(comment);
    }

    public Comment saveComment(Comment comment){
        return commentDao.save(comment);
    }

    public Comment getCommentById(String commentId){
        Optional<Comment> optionalComment = commentDao.findById(commentId);
        if(optionalComment.isEmpty())throw new RuntimeException("Comment does not exist");
        return optionalComment.get();
    }


    public List<GetCommentDTO> findCommentsByPostId(String postId, int pageNumber, int pageSize){
        return commentDao.findByPostId(postId, PageRequest.of(pageNumber, pageSize, Sort.by("created_at").descending())).stream().map(GetCommentDTO::toGetCommentDTO).toList();
    }

    public List<GetCommentDTO> findCommentsByPostId(String postId, String userId, int pageNumber, int pageSize){
        return commentDao.findByPostId(postId, PageRequest.of(pageNumber, pageSize, Sort.by("created_at").descending())).stream().map(post->GetCommentDTO.toGetCommentDTO(post, userId)).toList();
    }


    @Transactional
    public String replyToComment(CommentReplyDTO request, String userId){
        Users user = userService.getUserById(userId);
        Comment comment = getCommentById(request.getCommentId());
        CommentReply reply = CommentReply.builder()
                .comment(comment)
                .body(request.getBody())
                .user(user)
                .likes(new HashSet<>())
                .build();
        comment.getReplies().add(reply);
        return saveReply(reply).getId();
    }


    public List<GetCommentReplyDTO> getReplies(String commentId, int pageNumber, int pageSize){
        List<CommentReply> replies= commentReplyDao.findByCommentId(commentId, PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending()));
        return replies.stream().map(GetCommentReplyDTO::toGetCommentReplyDTO).toList();
    }

    public List<GetCommentReplyDTO> getReplies(String commentId, int pageNumber, int pageSize, String userId){
        List<CommentReply> replies= commentReplyDao.findByCommentId(commentId, PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending()));
        return replies.stream().map(reply->GetCommentReplyDTO.toGetCommentReplyDTO(reply, userId)).toList();
    }

    public CommentReply saveReply(CommentReply reply){
        return commentReplyDao.save(reply);
    }

    public CommentReply getReplyById(String id){
        Optional<CommentReply> optionalReply = commentReplyDao.findById(id);
        if(optionalReply.isEmpty())throw new RuntimeException("");
        return optionalReply.get();
    }
}
