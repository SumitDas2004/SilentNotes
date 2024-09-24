package com.silentNotes.Main.dto.user;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class UserDetailsDTO {
    private String id;
    private String username;
    private String collegeName;
    private String collegeDomain;
    private String avatar;
    private boolean verified;
}
