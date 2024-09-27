package com.silentNotes.Main.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetCommentsRequestDTO {
    private String userId;
    private String lastId;
    private String postId;
    private String lastCreatedAt;
}
