package com.silentNotes.Main.entity;

import com.silentNotes.Main.entity.Id.CommentReplyLikeId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(CommentReplyLikeId.class)
@Table(name="comment_reply_likes")
public class CommentReplyLike {
    @Id
    @ManyToOne
    @JoinColumn(name="commentId")
    private CommentReply commentReply;
    @Id
    private String userId;

    @Override
    public int hashCode(){
        return this.userId.hashCode();
    }

    @Override
    public boolean equals(Object o){
        return this.userId.equals(((CommentReplyLike)o).userId);
    }
}
