package com.silentNotes.Main.controller;

import com.silentNotes.Main.dto.post.CreatePostRequestDTO;
import com.silentNotes.Main.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/post")
@CrossOrigin(allowCredentials = "true", origins={"${client.domain}"})
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/")
    public ResponseEntity<?> createPost(@Valid @RequestBody CreatePostRequestDTO request){
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        postService.createPost(userId, request);
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Post creation successful.");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/view/{postId}")
    public ResponseEntity<?> increaseaViews(@PathVariable(name = "postId") String postId) {
        postService.increaseViews(postId);
        return new ResponseEntity<>(HttpStatusCode.valueOf(200));
    }

    @GetMapping("/feed")
    public ResponseEntity<?> feed(@RequestParam(value = "userId", required = false) String userId, @RequestParam(value = "pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success.");
        if(userId!=null && !userId.isEmpty())
            map.put("data", postService.getFeed(pageNumber, pageSize, userId));
        else map.put("data", postService.getFeed(pageNumber, pageSize));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
