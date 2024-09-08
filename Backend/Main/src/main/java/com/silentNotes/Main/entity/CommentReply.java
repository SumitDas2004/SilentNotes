package com.silentNotes.Main.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CommentReply {
    @ManyToOne
    @JoinColumn(name="commentId")
    @JsonIgnore
    private Comment comment;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(length = 1000000)
    private String body;

    @OneToMany(mappedBy = "commentReply", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @JsonIgnore
    private Set<CommentReplyLike> likes;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private Users user;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
}
