package com.silentNotes.Main.service;

import com.silentNotes.Main.Exceptions.EmptyPostBodyException;
import com.silentNotes.Main.Exceptions.PostDoesNotExistException;
import com.silentNotes.Main.dao.PostDao;
import com.silentNotes.Main.dto.post.CreatePostRequestDTO;
import com.silentNotes.Main.dto.post.FeedResponseDTO;
import com.silentNotes.Main.entity.Post;
import com.silentNotes.Main.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    UserService userService;

    @Autowired
    PostDao postDao;

    @Transactional
    public void createPost(String userId, CreatePostRequestDTO request) {
        if(request.getBody().isBlank())throw new EmptyPostBodyException();
        Users user = userService.getUserById(userId);

        Post post = Post.builder()
                .body(request.getBody())
                .user(user)
                .comments(new ArrayList<>())
                .likes(new HashSet<>())
                .views(0)
                .build();
        user.getPosts().add(post);
        userService.saveUser(user);

    }
    @Transactional
    public void increaseViews(String postId){
        postDao.increaseViews(postId);
    }

    public Post getPost(String postId){
        Optional<Post> post = postDao.findById(postId);
        if(post.isEmpty())throw new PostDoesNotExistException();
        return post.get();
    }

    public Post savePost(Post post){
        return postDao.save(post);
    }

    public List<FeedResponseDTO> getFeed(Date createdAt, String id, int pageSize, String userId){
        Users user = userService.getUserById(userId);
        List<Post> posts = postDao.getPosts(createdAt, id, pageSize);
        return posts.stream().map(post -> FeedResponseDTO.convertToFeedResponseDTO(post, user)).collect(Collectors.toList());
    }

    public List<FeedResponseDTO> getFeed(Date createdAt, String id, int pageSize){
        List<Post> posts = postDao.getPosts(createdAt, id, pageSize);
        return posts.stream().map(FeedResponseDTO::convertToFeedResponseDTO).collect(Collectors.toList());
    }

    public FeedResponseDTO getPostDetails(String postId){
        Post post = getPost(postId);
        return FeedResponseDTO.convertToFeedResponseDTO(post);
    }
    public FeedResponseDTO getPostDetails(String postId, String userId){
        Post post = getPost(postId);
        Users user = userService.getUserById(userId);
        return FeedResponseDTO.convertToFeedResponseDTO(post, user);
    }
}
