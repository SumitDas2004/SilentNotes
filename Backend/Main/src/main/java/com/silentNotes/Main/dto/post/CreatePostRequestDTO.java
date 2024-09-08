package com.silentNotes.Main.dto.post;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePostRequestDTO {
    @NotBlank(message = "Post body is blank.")
    private String body;
}
