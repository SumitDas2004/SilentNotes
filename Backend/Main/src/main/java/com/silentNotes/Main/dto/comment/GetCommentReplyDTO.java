package com.silentNotes.Main.dto.comment;

import com.silentNotes.Main.constants.Utils;
import com.silentNotes.Main.entity.CommentReply;
import com.silentNotes.Main.entity.CommentReplyLike;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class GetCommentReplyDTO {
    private String id;
    private String userId;
    private String username;
    private String avatar;
    private String college;
    private Date createdAt;
    private Date updatedAt;
    private String body;
    private long likeCnt;
    private boolean isLiked;
    private String collegeDomain;


    public static GetCommentReplyDTO toGetCommentReplyDTO (CommentReply data) {
        return GetCommentReplyDTO.builder()
                .id(data.getId())
                .userId(data.getUser().getId())
                .username(data.getUser().getActualUsername())
                .avatar(data.getUser().getAvatar())
                .college(data.getUser().getCollege())
                .createdAt(data.getCreatedAt())
                .updatedAt(data.getUpdatedAt())
                .body(data.getBody())
                .likeCnt(data.getLikes().size())
                .isLiked(false)
                .collegeDomain(Utils.extractDomain(data.getUser().getEmail()))
                .build();
    }

    public static GetCommentReplyDTO toGetCommentReplyDTO (CommentReply data, String userId) {
        CommentReplyLike like = CommentReplyLike.builder()
                .userId(userId)
                .commentReply(data)
                .build();
        System.out.println(userId+" "+data.getLikes()+" "+data.getLikes().contains(like));
        return GetCommentReplyDTO.builder()
                .collegeDomain(Utils.extractDomain(data.getUser().getEmail()))
                .id(data.getId())
                .userId(data.getUser().getId())
                .username(data.getUser().getActualUsername())
                .avatar(data.getUser().getAvatar())
                .college(data.getUser().getCollege())
                .createdAt(data.getCreatedAt())
                .updatedAt(data.getUpdatedAt())
                .body(data.getBody())
                .likeCnt(data.getLikes().size())
                .isLiked(data.getLikes().contains(like))
                .build();
    }
}
