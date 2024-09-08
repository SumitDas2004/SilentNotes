package com.silentNotes.Main.dto.post;

import com.silentNotes.Main.constants.Utils;
import com.silentNotes.Main.entity.Post;
import com.silentNotes.Main.entity.PostLike;
import com.silentNotes.Main.entity.Users;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedResponseDTO {
    private String username;
    private String college;
    private String collegeDomain;
    private String avatar;
    private String id;
    private String body;
    private int comments;
    private int likes;
    private long views;
    private Date createdAt;
    private Date updatedAt;
    private boolean isLiked;


    public static FeedResponseDTO convertToFeedResponseDTO(Post post, Users user){
        return FeedResponseDTO.builder()
                .id(post.getId())
                .collegeDomain(Utils.extractDomain(post.getUser().getEmail()))
                .likes(post.getLikes().size())
                .comments(post.getComments().size())
                .views(post.getViews())
                .body(post.getBody())
                .avatar(post.getUser().getAvatar())
                .username(post.getUser().getActualUsername())
                .college(post.getUser().getCollege())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .isLiked(user.getLikedPosts().contains(PostLike.builder().post(post).user(user).build()))
                .build();

    }

    public static FeedResponseDTO convertToFeedResponseDTO(Post post){
        return FeedResponseDTO.builder()
                .id(post.getId())
                .likes(post.getLikes().size())
                .comments(post.getComments().size())
                .views(post.getViews())
                .body(post.getBody())
                .avatar(post.getUser().getAvatar())
                .username(post.getUser().getActualUsername())
                .college(post.getUser().getCollege())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .collegeDomain(Utils.extractDomain(post.getUser().getEmail()))
                .isLiked(false)
                .build();

    }
}
