package com.silentNotes.Main.dao;

import com.silentNotes.Main.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<Users, String> {
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
    boolean existsByUsername(String email);
    @Query("update Users u set u.verified=true where u.id=?1")
    @Modifying
    void validateUser(String id);
}
