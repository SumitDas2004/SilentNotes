package com.silentNotes.Main.controller;

import com.silentNotes.Main.dto.comment.CommentReplyDTO;
import com.silentNotes.Main.dto.comment.GetCommentsRequestDTO;
import com.silentNotes.Main.dto.comment.GetRepliesRequestDTO;
import com.silentNotes.Main.dto.post.CommentRequestDTO;
import com.silentNotes.Main.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins={"${client.domain}"}, allowCredentials = "true")
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("/")
    public ResponseEntity<?> comment(@Valid @RequestBody CommentRequestDTO request) {
        String userId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        commentService.addComment(userId, request);
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Added comment successfully.");
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }


    @PostMapping("/getAll")
    public ResponseEntity<?> getComments(@RequestParam(value = "pageSize") int pageSize, @RequestBody GetCommentsRequestDTO request){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success!");
        map.put("data", request.getUserId()==null?commentService.findCommentsByPostId(request.getPostId(),  Date.from(Instant.parse(request.getLastCreatedAt())), request.getLastId(), pageSize):commentService.findCommentsByPostId(request.getPostId(),  Date.from(Instant.parse(request.getLastCreatedAt())), request.getLastId(), pageSize, request.getUserId()));
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/reply")
    public ResponseEntity<?> replyToComments(@RequestBody CommentReplyDTO request){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success!");
        map.put("id", commentService.replyToComment(request, (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/reply/get")
    public ResponseEntity<?> getReplies(@RequestParam("pageSize") Integer pageSize, @RequestBody GetRepliesRequestDTO request){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success!");
        map.put("data", request.getUserId()!=null?commentService.getReplies(request.getCommentId(), Date.from(Instant.parse(request.getLastCreatedAt())), request.getLastId(), pageSize, request.getUserId()):commentService.getReplies(request.getCommentId(),  Date.from(Instant.parse(request.getLastCreatedAt())), request.getLastId(), pageSize));
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }
}
