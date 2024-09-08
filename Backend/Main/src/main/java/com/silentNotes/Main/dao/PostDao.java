package com.silentNotes.Main.dao;

import com.silentNotes.Main.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostDao extends JpaRepository<Post, String> {
    @Modifying
    @Query("UPDATE Post p SET p.views=p.views+1 WHERE p.id=?1")
    void increaseViews(String postId);
}
