package com.silentNotes.Main.controller;

import com.silentNotes.Main.dao.PostLikeDAO;
import com.silentNotes.Main.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins={"${client.domain}"}, allowCredentials = "true")
@RequestMapping("/like")
public class LikeController {
    @Autowired
    PostLikeDAO postLikeDAO;

    @Autowired
    LikeService likeService;

    @PostMapping("/post")
    public ResponseEntity<?> likePost(@RequestParam("postId") String postId){
        String userId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int event = likeService.likePost(postId, userId);
        Map<String, Object> map = new HashMap<>();
        map.put("event", event);
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/comment/{id}")
    public ResponseEntity<?> likeComment(@PathVariable("id") String id){
        String userId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int event = likeService.likeComment(userId, id);
        Map<String, Object> map = new HashMap<>();
        map.put("event", event);
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/reply/{id}")
    public ResponseEntity<?> likeReply(@PathVariable("id") String id){
        String userId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int event = likeService.likeReply(id, userId);
        Map<String, Object> map = new HashMap<>();
        map.put("event", event);
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

}
