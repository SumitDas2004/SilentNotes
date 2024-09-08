package com.silentNotes.Main.entity.Id;

import com.silentNotes.Main.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentLikeId implements Serializable {
    private Comment comment;
    private String userId;
}
