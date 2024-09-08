package com.silentNotes.Main.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.silentNotes.Main.entity.Id.PostLikeId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@IdClass(PostLikeId.class)
@Table(name = "post_likes")
public class PostLike {
    @Id
    @ManyToOne
    @JoinColumn(name = "postId")
    @JsonIgnore
    private Post post;
    @Id
    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private Users user;

    @Override
    public  int hashCode(){
        return (this.user.getId()+this.post.getId()).hashCode();
    }
    @Override
    public boolean equals(Object obj){
        PostLike postLike = (PostLike) obj;
        return postLike.getUser().getId().equals(this.user.getId()) && postLike.getPost().getId().equals(this.post.getId());
    }
}
