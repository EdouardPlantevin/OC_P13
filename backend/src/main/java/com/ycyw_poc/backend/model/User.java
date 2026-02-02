package com.ycyw_poc.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    // Relation 1-1 avec CustomerProfile
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private CustomerProfile profile;
}