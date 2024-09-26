package com.silentNotes.Main.controller;

import com.silentNotes.Main.dto.post.CreatePostRequestDTO;
import com.silentNotes.Main.dto.post.GetPostRequestDTO;
import com.silentNotes.Main.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/post")
@CrossOrigin(allowCredentials = "true", origins={"${client.domain}"})
public class PostController {
    PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

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

    @PostMapping("/feed")
//    lastId -> Id of the last fetched page's oldest post. Send "" for first page
//    lastCreatedAt -> createdAt of the last fetched page's oldest post. Send currentDateTime for first page
    public ResponseEntity<?> feed(@RequestParam(value = "userId", required = false) String userId, @RequestBody GetPostRequestDTO request, @RequestParam("pageSize") int pageSize){
        Date lastCreatedAtInDate = Date.from(Instant.parse(request.getLastCreatedAt()));
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success.");
        if(userId!=null && !userId.isEmpty())
            map.put("data", postService.getFeed(lastCreatedAtInDate, request.getLastId(), pageSize, userId));
        else map.put("data", postService.getFeed(lastCreatedAtInDate, request.getLastId(), pageSize));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<?> postdetails(@RequestParam("postId") String postId, @RequestParam(name="userId", required = false) String userId){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success.");
        if(userId!=null && !userId.isEmpty())
            map.put("data", postService.getPostDetails(postId, userId));
        else map.put("data", postService.getPostDetails(postId));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
