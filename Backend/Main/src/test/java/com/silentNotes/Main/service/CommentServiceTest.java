package com.silentNotes.Main.service;

import com.silentNotes.Main.dao.CommentReplyDao;
import com.silentNotes.Main.dto.comment.GetCommentReplyDTO;
import com.silentNotes.Main.entity.Comment;
import com.silentNotes.Main.entity.CommentReply;
import com.silentNotes.Main.entity.Post;
import com.silentNotes.Main.entity.Users;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageRequest;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

import static org.mockito.Mockito.when;

public class CommentServiceTest {

    @InjectMocks
    CommentService commentService;

    @Mock
    CommentReplyDao replyDao;

    @BeforeEach
    void before() {
        MockitoAnnotations.initMocks(this);
    }

//    @Test
    void getCommentReplyTest() {
        when(replyDao.findByCommentId(ArgumentMatchers.anyString(), ArgumentMatchers.any(Date.class), ArgumentMatchers.anyString(), ArgumentMatchers.anyInt()))
                .thenReturn(List.of(
                        CommentReply.builder()
                                .user(Users.builder()
                                        .id("abc")
                                        .college("Nit")
                                        .avatar("Av")
                                        .username("Sumit")
                                        .build())
                                .id("reply1")
                                .body("Hello world")
                                .likes(new HashSet<>())
                                .createdAt(new Date(123456789))
                                .updatedAt(new Date(123456789))
                                .build()
                ));
        Assertions.assertEquals(List.of(GetCommentReplyDTO.builder()
                .userId("abc")
                .avatar("Av")
                .username("Sumit")
                .college("Nit")
                .likeCnt(0)
                .createdAt(new Date(123456789))
                .updatedAt(new Date(123456789))
                .body("Hello world")
                .id("reply1")
                .build()), commentService.getReplies("", new Date(), "", 01));
    }

}
