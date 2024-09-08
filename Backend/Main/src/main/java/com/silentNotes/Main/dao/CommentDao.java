package com.silentNotes.Main.dao;

import com.silentNotes.Main.entity.Comment;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentDao extends JpaRepository<Comment, String> {
    @Query(nativeQuery = true, value = "SELECT * from comments WHERE comments.post_id=?1")
    List<Comment> findByPostId(String postId, PageRequest page);


}
