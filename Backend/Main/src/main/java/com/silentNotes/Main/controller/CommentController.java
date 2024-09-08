package com.silentNotes.Main.controller;

import com.silentNotes.Main.dto.comment.CommentReplyDTO;
import com.silentNotes.Main.dto.post.CommentRequestDTO;
import com.silentNotes.Main.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/getAll")
    public ResponseEntity<?> getComments(@RequestParam(value = "postId") String postId, @RequestParam(value = "userId", required = false) String userId, @RequestParam(value = "pageSize") int pageSize, @RequestParam(value = "pageNumber") int pageNumber){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success!");
        map.put("data", userId==null?commentService.findCommentsByPostId(postId, pageNumber, pageSize):commentService.findCommentsByPostId(postId, userId, pageNumber, pageSize));
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/reply")
    public ResponseEntity<?> replyToComments(@RequestBody CommentReplyDTO request){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success!");
        map.put("id", commentService.replyToComment(request, (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/reply/get")
    public ResponseEntity<?> getReplies(@RequestParam("commentId") String commentId, @RequestParam("pageNumber") Integer pageNumber, @RequestParam("pageSize") Integer pageSize, @RequestParam(name="userId", required = false) String userId){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success!");
        map.put("data", userId!=null?commentService.getReplies(commentId, pageNumber, pageSize, userId):commentService.getReplies(commentId, pageNumber, pageSize));
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }
}
