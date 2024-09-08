package com.silentNotes.Main.dto.comment;

import com.silentNotes.Main.constants.Utils;
import com.silentNotes.Main.entity.Comment;
import com.silentNotes.Main.entity.CommentLike;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class GetCommentDTO {
    private String id;
    private int replyCount;
    private String body;
    private Date createdAt;
    private Date updateAt;
    private String username;
    private String userCollege;
    private String userAvatar;
    private String collegeDomain;
    private long totalLikes;
    private boolean isLiked;


    public static GetCommentDTO toGetCommentDTO(Comment comment){
        return GetCommentDTO.builder()
                .id(comment.getId())
                .body(comment.getBody())
                .updateAt(comment.getUpdatedAt())
                .createdAt(comment.getCreatedAt())
                .replyCount(comment.getReplies().size())
                .username(comment.getUser().getActualUsername())
                .userCollege(comment.getUser().getCollege())
                .userAvatar(comment.getUser().getAvatar())
                .collegeDomain(Utils.extractDomain(comment.getUser().getEmail()))
                .totalLikes(comment.getLikes().size())
                .isLiked(false)
                .build();
    }

    public static GetCommentDTO toGetCommentDTO(Comment comment, String userId){
        CommentLike like=CommentLike.builder()
                .comment(comment)
                .userId(userId)
                .build();
        return GetCommentDTO.builder()
                .id(comment.getId())
                .body(comment.getBody())
                .updateAt(comment.getUpdatedAt())
                .createdAt(comment.getCreatedAt())
                .replyCount(comment.getReplies().size())
                .username(comment.getUser().getActualUsername())
                .userCollege(comment.getUser().getCollege())
                .userAvatar(comment.getUser().getAvatar())
                .collegeDomain(Utils.extractDomain(comment.getUser().getEmail()))
                .totalLikes(comment.getLikes().size())
                .isLiked(comment.getLikes().contains(like))
                .build();
    }
}
