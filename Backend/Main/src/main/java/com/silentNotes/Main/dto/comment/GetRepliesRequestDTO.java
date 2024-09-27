package com.silentNotes.Main.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GetRepliesRequestDTO {
    private String userId;
    private String commentId;
    private String lastId;
    private String lastCreatedAt;
}
