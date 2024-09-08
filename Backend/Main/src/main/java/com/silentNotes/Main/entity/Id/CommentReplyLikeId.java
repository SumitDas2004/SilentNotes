package com.silentNotes.Main.entity.Id;

import com.silentNotes.Main.entity.CommentReply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentReplyLikeId implements Serializable {
    private CommentReply commentReply;
    private String userId;
}
