package com.silentNotes.Main.dto.post;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PostDetailsDTO {
    private String postId;
    private String body;
    private long likes;
    private long comments;
    private long views;
}
