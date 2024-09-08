package com.silentNotes.Main.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name="posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="userId")
    private Users user;
    @Column(length = 1000000)
    private String body;
    private long views;
    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @JsonIgnore
    private Set<PostLike> likes;
    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;

    @CreationTimestamp
    @Column(updatable = false)
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;

}
