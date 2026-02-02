package com.ycyw_poc.backend.repository;

import com.ycyw_poc.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.profile WHERE u.profile IS NOT NULL")
    List<User> findAllWithProfile();
}
