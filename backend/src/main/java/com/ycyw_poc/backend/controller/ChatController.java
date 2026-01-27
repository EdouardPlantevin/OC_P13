package com.ycyw_poc.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @GetMapping("/")
    public String hello() {
        return "Hello, YCYW!";
    }

}
