package com.ycyw_poc.backend.mapper;

import com.ycyw_poc.backend.dto.CustomerDto;
import com.ycyw_poc.backend.model.CustomerProfile;
import com.ycyw_poc.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerDto toDto(User user) {
        CustomerProfile p = user.getProfile();
        String name = user.getEmail();
        if (p != null) {
            String first = p.getFirstName() != null ? p.getFirstName() : "";
            String last = p.getLastName() != null ? p.getLastName() : "";
            String full = (first + " " + last).trim();
            if (!full.isEmpty()) name = full;
        }
        return new CustomerDto(String.valueOf(user.getId()), name);
    }
}
