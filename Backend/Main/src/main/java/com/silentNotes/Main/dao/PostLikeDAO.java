package com.silentNotes.Main.dao;

import com.silentNotes.Main.entity.Id.PostLikeId;
import com.silentNotes.Main.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeDAO
        extends JpaRepository<PostLike, PostLikeId> {
}
