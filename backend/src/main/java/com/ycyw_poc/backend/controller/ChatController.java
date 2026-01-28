package com.ycyw_poc.backend.controller;

import com.ycyw_poc.backend.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {


    private final List<ChatMessage> messageHistory = new ArrayList<>();

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        messageHistory.add(new ChatMessage("Bonjour ! Comment puis-je vous aider aujourd'hui ?", "SUPPORT", "09:41"));
        messageHistory.add(new ChatMessage("Bonjour, j'ai cassé la voiture en essayant de faire un tonneau.", "USER", "09:42"));
        messageHistory.add(new ChatMessage("C'est génial. vous êtes assuré pour les tonneaux", "SUPPORT", "09:43"));
    }

    @GetMapping("/messages")
    public List<ChatMessage> getMessages() {
        return messageHistory;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage message) {

        message.setTimes(getCurrentTime());

        messageHistory.add(message);
        return message;
    }


    private String getCurrentTime() {
        return LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
