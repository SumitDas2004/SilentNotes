package com.silentNotes.Main.dao;

import com.silentNotes.Main.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface CommentDao extends JpaRepository<Comment, String> {
    @Query(nativeQuery = true, value = "SELECT * from comments WHERE post_id=?1 and (created_at, id) < (?2, ?3) ORDER BY created_at DESC, id DESC LIMIT ?4")
    List<Comment> findByPostId(String postId, Date createdAt, String id, int pageSize);


}
