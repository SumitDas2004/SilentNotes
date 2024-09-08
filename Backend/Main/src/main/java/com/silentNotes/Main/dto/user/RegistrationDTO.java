package com.silentNotes.Main.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {
    @NotBlank(message = "Username can't be blank.")
    private String username;

    @NotBlank(message = "Password can't be blank.")
    private String password;

    @NotBlank(message = "College name can't be blank.")
    private String college;

    @NotBlank(message = "Avatar can't be blank.")
    private String avatar;

    @Email(message="Invalid email format.")
    private String email;
}
