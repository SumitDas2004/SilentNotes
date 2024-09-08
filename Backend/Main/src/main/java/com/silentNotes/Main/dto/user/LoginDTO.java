package com.silentNotes.Main.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    @NotBlank(message = "Username can't be blank.")
    private String username;

    @NotBlank(message = "Password can't be blank.")
    private String password;
}
