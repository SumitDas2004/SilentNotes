package com.silentNotes.Main.dto.comment;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentReplyDTO {
    private String commentId;
    private String body;
}
