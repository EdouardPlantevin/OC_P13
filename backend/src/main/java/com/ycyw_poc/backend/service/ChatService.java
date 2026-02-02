package com.ycyw_poc.backend.service;

import com.ycyw_poc.backend.model.ChatMessage;
import com.ycyw_poc.backend.model.ChatSession;
import com.ycyw_poc.backend.repository.ChatMessageRepository;
import com.ycyw_poc.backend.repository.ChatSessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository messageRepository;
    private final ChatSessionRepository sessionRepository;

    public ChatService(ChatMessageRepository messageRepository, ChatSessionRepository sessionRepository) {
        this.messageRepository = messageRepository;
        this.sessionRepository = sessionRepository;
    }

    public ChatSession findOrCreateSession(String roomId) {
        return sessionRepository.findById(roomId)
                .orElseGet(() -> {
                    ChatSession session = new ChatSession();
                    session.setId(roomId);
                    session.setStartTime(LocalDateTime.now());
                    session.setStatus("OPEN");
                    return sessionRepository.save(session);
                });
    }

    public List<ChatMessage> getMessagesForRoom(String roomId) {
        return messageRepository.findBySessionIdOrderByTimestampAsc(roomId);
    }

    public ChatMessage saveMessage(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}