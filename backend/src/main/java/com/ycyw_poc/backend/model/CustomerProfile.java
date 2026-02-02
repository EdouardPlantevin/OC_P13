package com.ycyw_poc.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "customer_profiles")
@Data
public class CustomerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String licenseNumber;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}