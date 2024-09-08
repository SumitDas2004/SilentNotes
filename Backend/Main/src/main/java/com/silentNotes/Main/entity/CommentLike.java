package com.silentNotes.Main.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.silentNotes.Main.entity.Id.CommentLikeId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@IdClass(CommentLikeId.class)
@Table(name = "comment_likes")
public class CommentLike {
    @Id
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "commentId")
    private Comment comment;
    @Id
    private String userId;

    @Override
    public int hashCode(){
        return userId.hashCode();
    }

    @Override
    public boolean equals(Object o){
        CommentLike data = (CommentLike) o;

        return this.userId.equals(data.getUserId());
    }
}
