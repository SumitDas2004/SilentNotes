package com.silentNotes.Main.dao;

import com.silentNotes.Main.entity.CommentReply;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CommentReplyDao extends JpaRepository<CommentReply, String> {
    @Query(nativeQuery = true, value = "SELECT * from comment_reply where comment_id=?1 and (created_at, id)<(?2, ?3) ORDER BY created_at DESC, id DESC LIMIT ?4")
    List<CommentReply> findByCommentId(String commentId, Date lastCreatedAt, String lastReplyId, int pageSize);

}
