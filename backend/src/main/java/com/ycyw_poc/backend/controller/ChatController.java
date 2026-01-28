package com.ycyw_poc.backend.controller;

import com.ycyw_poc.backend.model.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    private final Map<String, List<ChatMessage>> chatRooms = new HashMap<>();

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;

        chatRooms.put("1", new ArrayList<>());
        chatRooms.get("1").add(new ChatMessage("Bonjour Edouard, Comment puis-je vous aider aujourd'hui ?", "SUPPORT", "09:00"));

        chatRooms.put("3", new ArrayList<>());
        chatRooms.get("3").add(new ChatMessage("Bonjour Adèle, Comment puis-je vous aider aujourd'hui ? !", "SUPPORT", "10:00"));
    }

    @GetMapping("/messages/{roomId}")
    public List<ChatMessage> getMessages(@PathVariable String roomId) {
        return chatRooms.getOrDefault(roomId, new ArrayList<>());
    }

    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, @Payload ChatMessage message) {
        message.setTimes(getCurrentTime());
        chatRooms.computeIfAbsent(roomId, k -> new ArrayList<>()).add(message);
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);
    }


    private String getCurrentTime() {
        return LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
