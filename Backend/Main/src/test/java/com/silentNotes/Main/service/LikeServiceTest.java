package com.silentNotes.Main.service;

import com.silentNotes.Main.dao.CommentReplyDao;
import com.silentNotes.Main.entity.CommentReply;
import com.silentNotes.Main.entity.CommentReplyLike;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

public class LikeServiceTest {
    @InjectMocks
    LikeService likeService;


    @Mock
    CommentService commentService;

    @Mock
    CommentReplyDao commentReplyDao;

    @BeforeEach
    void initialize(){
        MockitoAnnotations.initMocks(this);
    }

//    @Test
    public void commentReplyLikeTest(){
        when(commentReplyDao.findById(ArgumentMatchers.anyString())).thenReturn(
                Optional.ofNullable(CommentReply.builder()
                        .likes(new HashSet<>(List.of(
                                CommentReplyLike.builder()
                                        .userId("1")
                                        .build()
                        )))
                        .build())
        );
        Assertions.assertSame(-1, likeService.likeReply("", "1"));
        Assertions.assertSame(1, likeService.likeReply("", "2"));
    }
}
