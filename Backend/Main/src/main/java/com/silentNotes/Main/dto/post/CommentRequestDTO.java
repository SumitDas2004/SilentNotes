package com.silentNotes.Main.dto.post;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class CommentRequestDTO {
    @NotBlank(message="PostId not present")
    String postId;
    @NotBlank(message="Body not present")
    String body;
}
