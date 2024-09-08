package com.silentNotes.Main.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "users")
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(unique = true, length = 30)
    private String username;
    private String password;
    private String college;
    private String avatar;
    private String email;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private Set<Post> posts;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    @JsonIgnore
    private Set<PostLike> likedPosts;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

//    To be used for authentication
    @Override
    public String getUsername(){
        return this.id;
    }

    public String getActualUsername(){
        return this.username;
    }

}
