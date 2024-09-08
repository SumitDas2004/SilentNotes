package com.silentNotes.Main.dao;

import com.silentNotes.Main.entity.CommentReply;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentReplyDao extends JpaRepository<CommentReply, String> {
    @Query("SELECT c from CommentReply c where c.comment.id=?1")
    List<CommentReply> findByCommentId(String commentId, PageRequest request);

}
