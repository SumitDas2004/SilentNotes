package com.silentNotes.Main.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name="comments")
public class Comment {
    @ManyToOne
    @JoinColumn(name="postId")
    @JsonIgnore
    private Post post;
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="userId")
    private Users user;
    @Column(length = 1000000)
    private String body;
    @OneToMany(mappedBy = "comment", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @JsonIgnore
    private List<CommentReply> replies;
    @OneToMany(mappedBy = "comment", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @JsonIgnore
    private Set<CommentLike> likes;
    @CreationTimestamp
    @Column(updatable = false)
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
}
