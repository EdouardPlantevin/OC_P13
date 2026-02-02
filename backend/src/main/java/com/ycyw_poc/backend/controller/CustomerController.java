package com.ycyw_poc.backend.controller;

import com.ycyw_poc.backend.dto.CustomerDto;
import com.ycyw_poc.backend.mapper.CustomerMapper;
import com.ycyw_poc.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    private final UserRepository userRepository;
    private final CustomerMapper customerMapper;

    public CustomerController(UserRepository userRepository, CustomerMapper customerMapper) {
        this.userRepository = userRepository;
        this.customerMapper = customerMapper;
    }

    /** Liste des clients (User + CustomerProfile) pour la page d'accueil. */
    @GetMapping
    public List<CustomerDto> getCustomers() {
        return userRepository.findAllWithProfile().stream()
                .map(customerMapper::toDto)
                .toList();
    }
}
