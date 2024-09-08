package com.silentNotes.Main.entity.Id;

import com.silentNotes.Main.entity.Post;
import com.silentNotes.Main.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostLikeId implements Serializable {
    private Post post;
    private Users user;
}
